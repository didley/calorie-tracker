import { useQuery, useMutation, queryCache } from "react-query";
// import { useState, useEffect } from "react";
// import { useMutation as _useMutation } from "hooks/useApi/useMutation";
// import { useQuery as _useQuery } from "hooks/useApi/useQuery";

import {
  getDiaryEntryByDate,
  addFoodToEntryList,
  updateDiaryEntry,
  removeFoodsByIds,
} from "api/diary";

function useDiaryEntry(date) {
  return useQuery(["entry", date], () => getDiaryEntryByDate(date));
}

function useAddFood() {
  return useMutation((data) => addFoodToEntryList(data));
}

function useUpdateEntry() {
  // To move from Diary component
}

function useRemoveFoods() {
  return useMutation((ids) => removeFoodsByIds(ids));
}
export { useDiaryEntry, useAddFood, useUpdateEntry, useRemoveFoods };

// export function useDiary(selectedDate) {
//   const [diaryEntry, setDiaryEntry] = useState({});

//   useEffect(() => {
//     const { data, status } = _useQuery(
//       ["entry", selectedDate],
//       getDiaryEntry(selectedDate)
//     );

//     setDiaryEntry({ data, status });
//   }, [selectedDate]);

//   function deleteFoods(selectedDate, selectedItems) {
//     const mutation = _useMutation((selectedDate, selectedItems) =>
//       removeDiaryItems(selectedDate, selectedItems)
//     );
//     const { removeDiaryItems, isError } = mutation;

//     return [removeDiaryItems, { isError }];
//     // const { mutate, data } = _useMutation(removeDiaryItems);
//     // mutate(selectedDate, selectedItems);
//     // return { data };
//   }

//   function handleNoteChange(event) {
//     setDiaryEntry({ note: event.target.value, ...diaryEntry });
//   }

//   return { diaryEntry, setDiaryEntry, deleteFoods, handleNoteChange };
// }
