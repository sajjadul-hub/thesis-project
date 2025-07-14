import { useEffect, useState } from "react";

function useScrollYPosition() {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    function updateScrollPosition() {
      setScrollY(window.scrollY);
    }

    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  return scrollY;
}

export default useScrollYPosition;
