import React from "react";

export default function useInfiniteScroll(fetchNextFn, dependencesArray) {
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) fetchNextFn();
    };
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (scrollRef.current) observer.observe(scrollRef.current);
    // eslint-disable-next-line
  }, [...dependencesArray, fetchNextFn]);

  return scrollRef;
}
