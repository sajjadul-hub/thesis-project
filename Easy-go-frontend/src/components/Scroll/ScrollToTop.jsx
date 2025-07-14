import React from "react";
import { useLocation, useHistory } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [location, history]);

  return null;
};

export default ScrollToTop;
