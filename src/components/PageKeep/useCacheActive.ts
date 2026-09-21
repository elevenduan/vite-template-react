import { useContext, useEffect, useEffectEvent, useRef } from "react";
import { PageActivityContext } from "./context";

export function useCacheActive(action: () => void | (() => void)) {
  const active = useContext(PageActivityContext);
  const onCacheActive = useEffectEvent(action);
  const hasBeenInactiveRef = useRef(false);

  useEffect(() => {
    if (!active) {
      hasBeenInactiveRef.current = true;
      return;
    }

    if (hasBeenInactiveRef.current) {
      return onCacheActive();
    }
  }, [active]);
}
