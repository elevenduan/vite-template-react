import React, { useEffect } from "react";
import { RouteObject } from "react-router";
import data from "./data";

// title
type TypeProps = {
  title?: string;
  element?: React.ReactNode | null;
};

function Element({ title, element }: TypeProps) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return element;
}

// routes
function getRoutes(routes: any[]): RouteObject[] {
  return routes.map(({ title, element, children, ...rest }) => ({
    element: element ? <Element title={title} element={element} /> : element,
    children: children?.length ? getRoutes(children) : children,
    ...rest
  }));
}

const routes = getRoutes(data);

export default routes;
