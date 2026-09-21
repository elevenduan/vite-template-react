import { useContext, useEffect, useEffectEvent } from "react";
import { PageActivityContext } from "./context";

export function usePageActive(action: () => void | (() => void)) {
  const active = useContext(PageActivityContext);
  const onPageActive = useEffectEvent(action);

  useEffect(() => {
    if (active) {
      return onPageActive();
    }
  }, [active]);
}
