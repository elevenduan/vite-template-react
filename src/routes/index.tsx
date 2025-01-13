import React, { useEffect } from "react";
import type { RouteObject } from "react-router";
import RoutesData from "./RoutesData";

// Add Title
function WrapElement({
  title,
  element
}: {
  title?: string;
  element: React.ReactElement;
}) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return element;
}

function getRoutes(routes: any[]): RouteObject[] {
  return routes.map(({ element, children, title, ...rest }) => ({
    element: element && <WrapElement element={element} title={title} />,
    children: children?.length ? getRoutes(children) : children,
    ...rest
  }));
}

const routes = getRoutes(RoutesData);

export default routes;
