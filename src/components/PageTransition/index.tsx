import { useEffect, useState, useRef, ReactNode } from "react";
import { useLocation } from "react-router";
import "./index.css";

type TypeDirection = "backward" | "forward" | "refresh";
type TypeStatus = "active" | "done";
type Typeeffect = "parallax" | "fade" | "dive" | "cover" | "none";
type TypeProps = {
  children?: ReactNode;
  duration?: number; // ms
  effect?: Typeeffect;
  pagesClassName?: string;
  onActive?: () => void;
  onDone?: () => void;
};
type TypeStyle = React.CSSProperties & {
  "--pt-page-transition-duration"?: string;
};

// index
const getIdx = (): number => window.history?.state?.idx;

// direction
const getDirection = (prevIdx: number, nextIdx: number): TypeDirection => {
  const diff = nextIdx - prevIdx;
  if (diff < 0) {
    return "backward";
  }
  if (diff > 0) {
    return "forward";
  }
  return "refresh";
};

export const PageTransition = (props: TypeProps) => {
  const {
    children,
    duration: originDuration = 500,
    effect = "parallax",
    pagesClassName = "",
    onActive,
    onDone
  } = props;

  const location = useLocation();
  const prevIdxRef = useRef<number>(getIdx());
  const [direction, setDirection] = useState<TypeDirection>("refresh");
  const [status, setStatus] = useState<TypeStatus>("done");
  const refEnterHtml = useRef<any>();

  // duration, style
  const duration = effect === "none" ? 0 : originDuration;
  const pagesStyle: TypeStyle = {
    "--pt-page-transition-duration": `${duration}ms`
  };

  // direction
  function setPageDirection() {
    const next = getIdx();
    const dir = getDirection(prevIdxRef.current, next);
    prevIdxRef.current = next;
    setDirection(dir);
  }

  function start() {
    setPageDirection();
    // clone
    const nodeEnter = document.querySelector("#pt-page-enter");
    const nodeExit = document.querySelector("#pt-page-exit");
    if (nodeEnter && nodeExit) {
      nodeExit.append(...(refEnterHtml.current || []));
      refEnterHtml.current = nodeEnter.querySelectorAll("& > *");
    }
    // active
    setStatus("active");
    onActive?.();
    // done
    setTimeout(() => {
      setStatus("done");
      onDone?.();
      if (nodeExit) {
        nodeExit.innerHTML = "";
      }
    }, duration);
  }

  useEffect(() => {
    start();
  }, [location.key]);

  return (
    <div
      className={`pt-pages pt-pages-${direction} pt-pages-${effect} ${pagesClassName}`}
      style={pagesStyle}
    >
      <div
        id="pt-page-enter"
        className={`pt-page pt-page-${status === "active" ? "enter" : "enter-done"}`}
      >
        {children}
      </div>
      <div
        id="pt-page-exit"
        className={`pt-page pt-page-${status === "active" ? "exit" : "exit-done"}`}
      ></div>
    </div>
  );
};
