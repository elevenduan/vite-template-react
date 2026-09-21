import { type ContextType, type ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { UNSAFE_LocationContext, useLocation } from "react-router";
import styles from "./index.module.css";

type Direction = "forward" | "backward" | "static";

type Page = {
  key: string;
  content: ReactNode;
  locationContext: ContextType<typeof UNSAFE_LocationContext>;
  direction: Direction;
};

type PageLayerProps = Page & {
  leaving?: boolean;
  onAnimationEnd: () => void;
};

function getHistoryIndex() {
  const state = window.history.state as { idx?: unknown } | null;
  return typeof state?.idx === "number" ? state.idx : undefined;
}

function PageLayer({ content, direction, leaving = false, locationContext, onAnimationEnd }: PageLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const completeLeavingPage = () => {
    if (leaving) {
      onAnimationEnd();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!leaving || !container) return;

    if (direction === "static") {
      onAnimationEnd();
      return;
    }

    const handleAnimationCancel = (event: AnimationEvent) => {
      if (event.target === container) {
        onAnimationEnd();
      }
    };

    container.addEventListener("animationcancel", handleAnimationCancel);
    return () => container.removeEventListener("animationcancel", handleAnimationCancel);
  }, [direction, leaving, onAnimationEnd]);

  return (
    <UNSAFE_LocationContext.Provider value={locationContext}>
      <div
        ref={containerRef}
        className={`${styles.inner} ${leaving ? styles.leaving : styles.entering} ${styles[direction] ?? ""}`}
        onAnimationEnd={(event) => {
          if (event.target === event.currentTarget) {
            completeLeavingPage();
          }
        }}
      >
        {content}
      </div>
    </UNSAFE_LocationContext.Provider>
  );
}

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const { key: routeKey } = useLocation();
  const locationContext = useContext(UNSAFE_LocationContext);
  const initialPage = { key: routeKey, content: children, locationContext, direction: "static" as const };
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [leavingPage, setLeavingPage] = useState<Page>();
  const currentPageRef = useRef(currentPage);
  const historyIndexRef = useRef(getHistoryIndex());

  useLayoutEffect(() => {
    if (currentPageRef.current.key === routeKey) {
      return;
    }

    const nextHistoryIndex = getHistoryIndex();
    const direction: Direction =
      nextHistoryIndex !== undefined && historyIndexRef.current !== undefined
        ? nextHistoryIndex > historyIndexRef.current
          ? "forward"
          : nextHistoryIndex < historyIndexRef.current
            ? "backward"
            : "static"
        : "static";
    historyIndexRef.current = nextHistoryIndex;

    const nextPage = { key: routeKey, content: children, locationContext, direction };

    setLeavingPage({ ...currentPageRef.current, direction });
    currentPageRef.current = nextPage;
    setCurrentPage(nextPage);
  }, [children, locationContext, routeKey]);

  return (
    <div className={styles.outer}>
      {leavingPage && <PageLayer {...leavingPage} leaving key={leavingPage.key} onAnimationEnd={() => setLeavingPage(undefined)} />}
      <PageLayer {...currentPage} key={currentPage.key} onAnimationEnd={() => {}} />
    </div>
  );
};
