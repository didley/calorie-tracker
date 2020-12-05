import { useQuery } from "react-query";
import api from "utils/api";

const getDiaryEntryByDate = async (key, date) => {
  const { data } = await api.get(`/diary/${date}`);
  console.log(data);
  return data;
};

export function useDiary(date) {
  return useQuery(["entry", date], getDiaryEntryByDate);
}
