import { useMutation } from "hooks/useApi/useMutation";
import { useQuery } from "hooks/useApi/useQuery";
import { useQuery as _useQuery } from "react-query";
import { getDiaryEntry, removeDiaryItems } from "api/diary";

function useDiaryEntry(date) {
  const { data, status } = _useQuery(["entry", date], () =>
    getDiaryEntry(date)
  );
  return { data, status };
}

function useDeleteItems(selectedDate, selectedItems) {
  const { mutate, data } = useMutation(removeDiaryItems);
  mutate(selectedDate, selectedItems);
  return { data };
}

export { useDiaryEntry, useDeleteItems };
