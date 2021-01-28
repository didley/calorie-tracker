import React, { useState } from "react";
import { useDiaryEntry } from "hooks/useDiary";
import { Link } from "react-router-dom";

import ListItem from "components/shared/ListItem";
import PlaceholderListItem from "components/shared/ListItem/PlaceholderListItem";
import EditMenu from "components/shared/EditMenu";
import DatePickerContainer from "./DatePickerContainer";
import { Button } from "components/shared/styling";
import { useUpdateEntry } from "hooks/useDiary";

import { useMutation, useQueryClient } from "react-query";
import { updateDiaryEntry } from "api/diary";

// import axios from "axios";
// import { client } from "api/client";
// import { getDiaryEntry } from "api/diary";
// import { useAlert } from "hooks/useAlert";
import NoteField from "./NoteField";

export default function Diary() {
  // const { setIsLoading, setTimedAlert } = useAlert();
  // const [data, setData] = useState({});

  const [showSelectBtn, setShowSelectBtn] = useState(false);
  const [selectedIDs, setSelectedIDs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("2020-11-06"); // TODO: Replace in production initial state with (new Date())

  const queryClient = useQueryClient();
  const { data = {}, isLoading, isSuccess, error } = useDiaryEntry(
    selectedDate
  );
  const { eaten, toEat, note } = data;

  const updateNoteMutation = useMutation(updateDiaryEntry, {
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["entry", selectedDate]);

      const previousEntry = queryClient.getQueryData(["entry", selectedDate]);

      queryClient.setQueryData(["entry", selectedDate], (prev) => ({
        ...prev,
        note: newData.updates.note,
      }));

      return { previousEntry };
    },
    onError: (err, newData, rollback) => {
      queryClient.setQueryData(["entry", selectedDate], rollback.previousEntry);
    },
    onSettled: () => queryClient.refetchQueries(["entry", selectedDate]),
  });

  // const [
  //   updateEntry,
  //   {
  //     isLoading: noteIsLoading,
  //     isSuccess: noteIsSuccess,
  //     isError: noteIsError,
  //     error: noteError,
  //   },
  // ] = useUpdateEntry();
  // const [updateEntry] = useUpdateEntry();

  function handleNoteChange(e) {
    updateNoteMutation.mutate({
      date: selectedDate,
      updates: { note: e.target.value },
    });
  }

  function handleDateChange(date) {
    const ISODate = new Date(date).toISOString().substr(0, 10);
    setSelectedDate(ISODate);
  }

  function toggleShowSelectBtn() {
    setSelectedIDs([]);
    setShowSelectBtn(!showSelectBtn);
  }

  function handleSelectFood(selectedFood) {
    if (showSelectBtn) {
      const foundId = selectedIDs.find((id) => id === selectedFood._id);
      if (foundId) {
        setSelectedIDs(selectedIDs.filter((id) => id !== foundId));
      } else {
        setSelectedIDs([...selectedIDs, selectedFood._id]);
      }
    } else {
      console.log({ selectedFood });
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-xl">
        <div className="flex justify-center">
          <DatePickerContainer
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
          />
        </div>
        <div className="bg-white p-3 mx-1 mb-3 rounded-lg shadow-lg">
          <div className="flex items-baseline">
            <h2>Diary</h2>
            <button
              onClick={toggleShowSelectBtn}
              className="text-center text-xs appearance-none text-gray-500 py-1 px-2 mx-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
            >
              {showSelectBtn ? "Clear" : "Edit"}
            </button>
            {showSelectBtn && (
              <EditMenu
                selectedItems={selectedIDs}
                selectedDate={selectedDate}
              />
            )}
          </div>
          <div className="space-y-6">
            <div>
              <div className="border-b flex justify-between pb-1">
                <h4 className="my-auto">Eaten</h4>
                <Link to={`/addFoods?date=${selectedDate}&list=eaten`}>
                  <Button color="green">+</Button>
                </Link>
              </div>
              <ul className="inline-block w-full h-32">
                {isLoading && <PlaceholderListItem amount={3} />}
                {isSuccess && eaten.length === 0 && toEat.length === 0 && (
                  <div className="text-center">
                    <small>No food added yet</small>
                  </div>
                )}
                {eaten &&
                  eaten.map((food) => (
                    <ListItem
                      key={food._id}
                      food={food.chosenFood}
                      chosenOptions={food.chosenOptions}
                      showSelectBtn={showSelectBtn}
                      onClickFn={() => handleSelectFood(food)}
                    />
                  ))}
              </ul>
            </div>
            <div>
              <div className="border-b flex justify-between pb-1">
                <h4 className="my-auto">To Eat</h4>
                <Link to={`/addFoods?date=${selectedDate}&list=toEat`}>
                  <Button color="green">+</Button>
                </Link>
              </div>
              <ul className="inline-block w-full h-32">
                {isLoading && <PlaceholderListItem amount={2} />}
                {toEat &&
                  toEat.map((food) => (
                    <ListItem
                      key={food._id}
                      food={food.chosenFood}
                      chosenOptions={food.chosenOptions}
                      showSelectBtn={showSelectBtn}
                      onClickFn={() => handleSelectFood(food)}
                    />
                  ))}
              </ul>
            </div>
            <NoteField
              onChange={handleNoteChange}
              value={note}
              // loading={noteIsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
