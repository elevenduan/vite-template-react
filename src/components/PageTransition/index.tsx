import { type ContextType, type ReactNode, useContext, useLayoutEffect, useRef, useState } from "react";
import { UNSAFE_LocationContext, useLocation } from "react-router";
import styles from "./index.module.css";

type Direction = "forward" | "backward" | "static";

type EnteringPage = {
  key: string;
  content: ReactNode;
  locationContext: ContextType<typeof UNSAFE_LocationContext>;
  direction: Direction;
};

type LeavingPage = {
  key: string;
  snapshot: DocumentFragment;
  scrollTop: number;
  direction: Direction;
};

type StaticPageProps = LeavingPage & {
  onAnimationEnd: () => void;
};

function getHistoryIndex() {
  const state = window.history.state as { idx?: unknown } | null;
  return typeof state?.idx === "number" ? state.idx : undefined;
}

function StaticPage({ snapshot, scrollTop, direction, onAnimationEnd }: StaticPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren(snapshot);
    const content = container.querySelector<HTMLElement>("[data-page-content]");
    if (content) {
      content.scrollTop = scrollTop;
    }
  }, [scrollTop, snapshot]);

  return (
    <div
      ref={containerRef}
      className={`${styles.inner} ${styles.leaving} ${styles[direction]}`}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) {
          onAnimationEnd();
        }
      }}
    />
  );
}

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const { key: routeKey } = useLocation();
  const locationContext = useContext(UNSAFE_LocationContext);
  const initialPage = { key: routeKey, content: children, locationContext, direction: "static" as const };
  const [currentPage, setCurrentPage] = useState<EnteringPage>(initialPage);
  const [leavingPage, setLeavingPage] = useState<LeavingPage>();
  const currentPageRef = useRef(currentPage);
  const currentPageElementRef = useRef<HTMLDivElement>(null);
  const historyIndexRef = useRef(getHistoryIndex());

  useLayoutEffect(() => {
    if (currentPageRef.current.key === routeKey) {
      return;
    }

    const nextHistoryIndex = getHistoryIndex();
    const direction: Direction =
      nextHistoryIndex !== undefined && historyIndexRef.current !== undefined && nextHistoryIndex < historyIndexRef.current ? "backward" : "forward";
    historyIndexRef.current = nextHistoryIndex;

    const nextPage = { key: routeKey, content: children, locationContext, direction };
    const snapshot = document.createDocumentFragment();
    const currentPageElement = currentPageElementRef.current;
    const scrollTop = currentPageElement?.querySelector<HTMLElement>("[data-page-content]")?.scrollTop ?? 0;
    currentPageElement?.childNodes.forEach((node) => snapshot.appendChild(node.cloneNode(true)));

    setLeavingPage({ key: currentPageRef.current.key, snapshot, scrollTop, direction });
    currentPageRef.current = nextPage;
    setCurrentPage(nextPage);
  }, [children, locationContext, routeKey]);

  return (
    <div className={styles.outer}>
      {leavingPage && <StaticPage {...leavingPage} key={leavingPage.key} onAnimationEnd={() => setLeavingPage(undefined)} />}
      <UNSAFE_LocationContext.Provider value={currentPage.locationContext}>
        <div ref={currentPageElementRef} key={currentPage.key} className={`${styles.inner} ${styles.entering} ${styles[currentPage.direction]}`}>
          {currentPage.content}
        </div>
      </UNSAFE_LocationContext.Provider>
    </div>
  );
};
