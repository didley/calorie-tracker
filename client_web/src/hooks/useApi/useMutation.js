// hook to wrap react-query useQuery hook with global alert/loading hook
import { useMutation as _useMutation } from "react-query";
import { useAlert } from "hooks/useAlert";
import { useEffect } from "react";

export function useMutation(apiFn, options = {}) {
  const { globalLoading = true } = options;
  const { setTimedAlert, setIsLoading } = useAlert();
  const [mutate, { status, data, error }] = _useMutation(apiFn);

  useEffect(() => {
    if (globalLoading) {
      if (status === "loading") {
        setIsLoading(true);
      } else setIsLoading(false);
    }
    if (status === "error") setTimedAlert("error", error);
  }, [status, setIsLoading, error, setTimedAlert, globalLoading]);

  return { mutate, data, status };
}
