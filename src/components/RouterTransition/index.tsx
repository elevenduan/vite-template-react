import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./index.css";

type ChildElement = React.ReactElement | null;
type DirectionType = "backward" | "forward" | "refresh";
type effectType = "parallax" | "fade" | "dive" | "cover" | "none";
type StageType = "enter" | "enter-done" | "exit" | "exit-done";
type StatusType = "active" | "done";
type PropsType = {
  children?: ChildElement;
  timeout?: number; // ms
  effect?: effectType;
  pagesClassName?: string;
  onActive?: () => void;
  onDone?: () => void;
};

// 页面顺序
const getIdx = (): number => window?.history?.state?.idx;

// 页面方向
const getDirection = (prevIdx: number, nextIdx: number): DirectionType => {
  const diff = nextIdx - prevIdx;
  if (diff < 0) {
    return "backward";
  }
  if (diff > 0) {
    return "forward";
  }
  return "refresh";
};

// 生成类名
function getPageClassNames(stage: StageType) {
  return `rt-page rt-page-${stage}`;
}

export const RouterTransition = (props: PropsType) => {
  const {
    children,
    timeout: time = 500,
    effect = "parallax",
    pagesClassName = "",
    onActive,
    onDone
  } = props;
  const timeout = effect === "none" ? 0 : time;
  const location = useLocation();
  const prevIdxRef = useRef<number>(getIdx());
  const [direction, setDirection] = useState<DirectionType>("refresh");
  const [status, setStatus] = useState<StatusType>("done");
  const [childs, setChilds] = useState<[ChildElement, ChildElement]>([
    null,
    null
  ]);
  const enterRef = useRef<ChildElement & { className?: string }>(null);
  const exitRef = useRef<ChildElement & { className?: string }>(null);

  function cloneChild() {
    const enterChild = React.createElement(
      "div",
      {
        ref: enterRef,
        key: location.key,
        className: getPageClassNames("enter")
      },
      children
    );
    const exitChild = childs[0]
      ? React.cloneElement(childs[0], {
          ref: exitRef,
          className: getPageClassNames("exit")
        })
      : null;

    setChilds([enterChild, exitChild]);
    setStatus("active");
    onActive?.();
  }

  function setPageDirection() {
    const next = getIdx();
    const dir = getDirection(prevIdxRef.current, next);
    prevIdxRef.current = next;
    setDirection(dir);
  }

  useEffect(() => {
    // 页面方向
    setPageDirection();

    // 复制页面
    cloneChild();
  }, [location]);

  useEffect(() => {
    if (!childs[0] && !childs[1]) return;
    setTimeout(
      () => {
        if (enterRef.current) {
          enterRef.current.className = getPageClassNames("enter-done");
        }
        if (exitRef.current) {
          exitRef.current.className = getPageClassNames("exit-done");
        }
        setStatus("done");
        onDone?.();
      },
      childs[0] && childs[1] ? timeout + 200 : 0
    );
  }, [childs]);

  return (
    <div
      className={`rt-pages rt-pages-${direction} rt-pages-${effect} ${pagesClassName}`}
      style={Object.assign({ "--rt-page-transition-duration": `${timeout}ms` })}
    >
      {status === "done" ? childs[0] : childs}
    </div>
  );
};
