// hook to wrap react-query useQuery hook with global alert/loading hook
import { useQuery as _useQuery } from "react-query";
import { useAlert } from "hooks/useAlert";
import { useEffect } from "react";

export function useQuery(key, apiFn, options = {}) {
  const { globalLoading = true } = options;
  const { setTimedAlert, setIsLoading, setIsFetching } = useAlert();
  const { status, data, error, isFetching } = _useQuery(key, apiFn);

  useEffect(() => {
    if (globalLoading) {
      if (status === "loading") {
        setIsLoading(true);
      } else setIsLoading(false);

      if (isFetching) {
        setIsFetching(true);
      } else setIsFetching(false);
    }
    if (status === "error") setTimedAlert("error", error);
  }, [
    status,
    isFetching,
    setIsLoading,
    setIsFetching,
    error,
    setTimedAlert,
    globalLoading,
  ]);

  return { data, status };
}
