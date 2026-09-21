import { type ContextType, type ReactNode, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { UNSAFE_LocationContext, useLocation, useOutlet } from "react-router";
import { PageActivityContext } from "./context";
import styles from "./index.module.css";

type TransitionDirection = "forward" | "backward" | "static";
type PageState = "active" | "leaving" | "cached";
type CachedPage = {
  key: string;
  content: ReactNode;
  locationContext: ContextType<typeof UNSAFE_LocationContext>;
};
type LeavingPage = { key: string; discardAfterAnimation: boolean };
type PageKeepProps = { maxCachedPages?: number };

function getHistoryIndex() {
  const state = window.history.state as { idx?: unknown } | null;
  return typeof state?.idx === "number" ? state.idx : undefined;
}

function PageLayer({ page, state, onLeavingAnimationEnd }: { page: CachedPage; state: PageState; onLeavingAnimationEnd?: () => void }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const completeLeaving = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (state === "leaving" && event.target === event.currentTarget) {
      onLeavingAnimationEnd?.();
    }
  };

  useEffect(() => {
    const layer = layerRef.current;
    if (state !== "leaving" || !layer) return;

    const handleAnimationCancel = (event: AnimationEvent) => {
      if (event.target === layer) {
        onLeavingAnimationEnd?.();
      }
    };
    layer.addEventListener("animationcancel", handleAnimationCancel);
    return () => layer.removeEventListener("animationcancel", handleAnimationCancel);
  }, [state, onLeavingAnimationEnd]);

  return (
    <UNSAFE_LocationContext.Provider value={page.locationContext}>
      <PageActivityContext.Provider value={state === "active"}>
        <div ref={layerRef} className={`${styles.page} ${styles[state]}`} onAnimationEnd={completeLeaving}>
          {page.content}
        </div>
      </PageActivityContext.Provider>
    </UNSAFE_LocationContext.Provider>
  );
}

export function PageKeep({ maxCachedPages = 10 }: PageKeepProps) {
  const location = useLocation();
  const locationContext = useContext(UNSAFE_LocationContext);
  const outlet = useOutlet();
  const pageKey = location.key;
  const historyIndexRef = useRef(getHistoryIndex());
  const activeKeyRef = useRef(pageKey);
  const [pages, setPages] = useState<CachedPage[]>(() => [{ key: pageKey, content: outlet, locationContext }]);
  const [activeKey, setActiveKey] = useState(pageKey);
  const [leavingPage, setLeavingPage] = useState<LeavingPage>();
  const [transitionDirection, setTransitionDirection] = useState<TransitionDirection>("static");

  useLayoutEffect(() => {
    const previousKey = activeKeyRef.current;
    const nextHistoryIndex = getHistoryIndex();
    if (previousKey === pageKey) {
      historyIndexRef.current = nextHistoryIndex;
      return;
    }

    const direction: TransitionDirection =
      nextHistoryIndex !== undefined && historyIndexRef.current !== undefined
        ? nextHistoryIndex > historyIndexRef.current
          ? "forward"
          : nextHistoryIndex < historyIndexRef.current
            ? "backward"
            : "static"
        : "static";

    historyIndexRef.current = nextHistoryIndex;
    setTransitionDirection(direction);
    activeKeyRef.current = pageKey;
    setActiveKey(pageKey);
    setLeavingPage(direction === "static" ? undefined : { key: previousKey, discardAfterAnimation: direction === "backward" });
    setPages((currentPages) => {
      const hasTargetPage = currentPages.some((page) => page.key === pageKey);
      const nextPages = hasTargetPage ? currentPages : [...currentPages, { key: pageKey, content: outlet, locationContext }];

      if (direction === "static") {
        return nextPages.filter((page) => page.key !== previousKey);
      }

      if (nextPages.length <= maxCachedPages) return nextPages;

      const evictablePages = nextPages.filter((page) => page.key !== previousKey && page.key !== pageKey);
      return evictablePages.length ? nextPages.filter((page) => page.key !== evictablePages[0].key) : nextPages;
    });
  }, [location.key, locationContext, outlet, pageKey, maxCachedPages]);

  const completeLeavingPage = (key: string) => {
    setLeavingPage((currentLeavingPage) => {
      if (currentLeavingPage?.key !== key) return currentLeavingPage;

      if (currentLeavingPage.discardAfterAnimation) {
        setPages((currentPages) => currentPages.filter((page) => page.key !== key));
      }
      return undefined;
    });
  };

  return (
    <div className={`${styles.root} ${styles[transitionDirection] ?? ""}`}>
      {pages.map((page) => {
        const state: PageState = page.key === activeKey ? "active" : page.key === leavingPage?.key ? "leaving" : "cached";
        return <PageLayer key={page.key} page={page} state={state} onLeavingAnimationEnd={() => completeLeavingPage(page.key)} />;
      })}
    </div>
  );
}
