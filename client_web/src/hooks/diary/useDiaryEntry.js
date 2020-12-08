import { useQuery } from "react-query";
import api from "utils/api";
import { useAlert } from "hooks/useAlert";
import { useEffect } from "react";

const getDiaryEntryByDate = async (_, date) => {
  const { data } = await api.get(`/diary/${date}`);
  return data;
};

export function useDiaryEntry(date) {
  const { setTimedAlert, setIsLoading, setIsFetching } = useAlert();
  const { status, data, error, isFetching } = useQuery(
    ["entry", date],
    getDiaryEntryByDate
  );

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else setIsLoading(false);

    if (isFetching) {
      setIsFetching(true);
    } else setIsFetching(false);

    if (status === "error") setTimedAlert(error);
  }, [status, isFetching, setIsLoading, setIsFetching, error, setTimedAlert]);

  return { data };
}
