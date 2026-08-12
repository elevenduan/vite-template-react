import { type ReactNode, useEffect } from "react";

export default function Index({ element, title }: { element: ReactNode; title?: string }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return element;
}
