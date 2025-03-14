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
  "--rt-page-transition-duration"?: string;
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

export const RouterTransition = (props: TypeProps) => {
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
  const [childs, setChilds] = useState<ReactNode[]>([null, null]);

  // duration, style
  const duration = effect === "none" ? 0 : originDuration;
  const pagesStyle: TypeStyle = {
    "--rt-page-transition-duration": `${duration}ms`
  };

  function setPageDirection() {
    const next = getIdx();
    const dir = getDirection(prevIdxRef.current, next);
    prevIdxRef.current = next;
    setDirection(dir);
  }

  function start() {
    setPageDirection();
    // clone
    const res = [children, childs[0]];
    setChilds(res);
    // active
    setStatus("active");
    onActive?.();
    // done
    setTimeout(
      () => {
        setStatus("done");
        onDone?.();
      },
      res[0] && res[1] ? duration : 0
    );
  }

  useEffect(() => {
    start();
  }, [location.key]);

  return (
    <div
      className={`rt-pages rt-pages-${direction} rt-pages-${effect} ${pagesClassName}`}
      style={pagesStyle}
    >
      <div
        className={`rt-page rt-page-${status === "active" ? "enter" : "enter-done"}`}
      >
        {childs[0]}
      </div>
      <div
        className={`rt-page rt-page-${status === "active" ? "exit" : "exit-done"}`}
      >
        {childs[1]}
      </div>
    </div>
  );
};
