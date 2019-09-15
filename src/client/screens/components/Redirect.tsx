import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";

const Redirect: React.FC<RedirectProps> = ({ history, path }) => {
  useEffect(() => {
    history.replace(path);
  }, []);
  return <div />;
};

interface RedirectProps extends RouteComponentProps {
  path: string;
}

export default Redirect;
