import { useEffect, useState } from "react";

function useDebounce(
  value,
  { delay = 500, skipWhenEmpty = true, initialValue = null } = {}
) {
  const [debouncedValue, setDebouncedValue] = useState(() =>
    initialValue ? initialValue : value
  );

  useEffect(() => {
    const skipDelay = skipWhenEmpty && !value ? 0 : delay;

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, skipDelay);

    return () => clearTimeout(handler);
  }, [value, delay, skipWhenEmpty]);

  return debouncedValue;
}

export { useDebounce };
