import React, { useEffect } from "react";
import RoutesObject from "./RoutesObject";
import type { RouteObject } from "react-router-dom";

// Add Title
function TitleElement({
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
  }, []);
  return element;
}

function getRoutes(routes: any[]): RouteObject[] {
  return routes.map(({ element, children, title, ...rest }) => ({
    element: element && <TitleElement element={element} title={title} />,
    children: children?.length ? getRoutes(children) : children,
    ...rest
  }));
}

const routes = getRoutes(RoutesObject);

export default routes;
