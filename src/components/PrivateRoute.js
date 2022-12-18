import * as React from "react";
import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

export const PrivateRoute = ({ element, path }) => {
  const isAuthenticated = localStorage.getItem("AUTH");
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/v2/Identity/login");
    }
  }, [isAuthenticated, history]);

  return isAuthenticated === true ? (
    <Route path={path} element={element} />
  ) : null;
};
