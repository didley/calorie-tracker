import React, { useState, useEffect, useRef } from "react";
import { useDiaryEntry, useUpdateEntry } from "hooks/useDiary";
import { Link, useParams, useHistory } from "react-router-dom";

import DatePickerContainer from "./DatePickerContainer";
import SummaryMenu from "./SummaryMenu";
import NoteField from "./NoteField";
import ListItem from "components/shared/ListItem";
import PlaceholderListItem from "components/shared/ListItem/PlaceholderListItem";
import ViewAsCalToggle from "./ViewAsCalToggle";
import EditMenu from "components/shared/EditMenu";
import { Button } from "components/shared/styling";

import { useDebounce } from "hooks/useDebounce";
import dateOnly from "utils/dateOnly";
import { ReactSortable } from "react-sortablejs";

export default function Diary() {
  const history = useHistory();
  const params = useParams();
  const selectedDate = dateOnly(params.date);
  const [showSelectBtn, setShowSelectBtn] = useState(false);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [viewAsCal, setViewAsCal] = useState(false);
  const [note, setNote] = useState(null);

  const [diaryQuery, listState] = useDiaryEntry(selectedDate);
  const { eatenList, setEatenList, toEatList, setToEatList } = listState;
  const { data = {}, isLoading, isSuccess, error } = diaryQuery;
  const { eaten = [], toEat = [], totalEatenKJ = 0 } = data;
  const updateMutation = useUpdateEntry();

  // !clean mess
  useEffect(() => {
    if (data.note) {
      setNote(data.note);
    } else {
      setNote("");
    }
  }, [data.note]);

  const debouncedNote = useDebounce(note, 1000);

  const debounceHookSet = useRef(false);

  useEffect(() => {
    debounceHookSet.current = false;
  }, [selectedDate]);
  useEffect(() => {
    if (debouncedNote !== null) {
      // Skips mutation on initial component render
      if (!debounceHookSet.current) {
        // Skips mutation on note state being set
        debounceHookSet.current = true;
        return;
      }

      updateMutation.mutate({
        date: selectedDate,
        updates: { note: debouncedNote },
      });
    }
  }, [debouncedNote]);
  // !end of mess

  function handleDateChange(date) {
    history.push(`/diary/${dateOnly(date)}`);
    setShowSelectBtn(false);
  }

  function toggleShowSelectBtn() {
    setSelectedFoods([]);
    setShowSelectBtn((prevState) => !prevState);
  }

  function handleSelectFood(selectedFood) {
    if (showSelectBtn) {
      const selectedIds = selectedFoods.map(({ _id }) => _id);
      const alreadySelected = selectedIds.includes(selectedFood._id);
      if (alreadySelected) {
        const selectedRemoved = selectedFoods.filter(
          (item) => item._id !== selectedFood._id
        );
        return setSelectedFoods(selectedRemoved);
      }
      setSelectedFoods([...selectedFoods, selectedFood]);
    }
  }

  function handleSorting() {
    updateMutation.mutate({
      date: selectedDate,
      updates: { eaten: eatenList, toEat: toEatList },
    });
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
          <div className="flex justify-between items-stretch">
            <h2>Diary</h2>
            <button
              onClick={toggleShowSelectBtn}
              className="self-center text-center text-xs appearance-none text-gray-500 py-1 px-2 mx-1 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 hover:text-red-500 hover:bg-gray-200"
            >
              {showSelectBtn ? "Clear" : "Edit"}
            </button>
          </div>

          <div className="flex justify-center m-2">
            {showSelectBtn && (
              <EditMenu
                className="self-center"
                selectedItems={selectedFoods}
                selectedDate={selectedDate}
                setShowSelectBtn={setShowSelectBtn}
              />
            )}
            {showSelectBtn || (
              <div className="p-1 rounded-lg border-2 border-gray-200">
                <div className="self-center flex items-stretch">
                  <ViewAsCalToggle
                    className="self-center"
                    onClick={() => setViewAsCal(!viewAsCal)}
                    viewAsCal={viewAsCal}
                  />
                  <SummaryMenu
                    totalEatenKJ={totalEatenKJ}
                    viewAsCal={viewAsCal}
                  />
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="mb-6">
              <div className="border-b flex justify-between pb-1">
                <h4 className="my-auto">Eaten</h4>
                <Link
                  to={{
                    pathname: "/addFoods",
                    search: `?date=${selectedDate}&list=eaten`,
                  }}
                >
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

                <ReactSortable
                  group="diaryGroup"
                  onSort={handleSorting}
                  list={eatenList}
                  setList={setEatenList}
                  animation={100}
                  className="h-full"
                >
                  {eatenList &&
                    eatenList.map((food) => (
                      <ListItem
                        key={food._id}
                        food={food.chosenFood}
                        chosenOptions={food.chosenOptions}
                        showSelectBtn={showSelectBtn}
                        onClick={() => handleSelectFood(food)}
                        viewAsCal={viewAsCal}
                      />
                    ))}
                </ReactSortable>
              </ul>
            </div>
            <div className="mb-6">
              <div className="border-b flex justify-between pb-1">
                <h4 className="my-auto">To Eat</h4>
                <Link to={`/addFoods?date=${selectedDate}&list=toEat`}>
                  <Button color="green">+</Button>
                </Link>
              </div>
              <ul className="inline-block w-full h-32">
                {isLoading && <PlaceholderListItem amount={2} />}
                <ReactSortable
                  group="diaryGroup"
                  onSort={handleSorting}
                  list={toEatList}
                  setList={setToEatList}
                  animation={100}
                  className="h-full"
                >
                  {toEatList &&
                    toEatList.map((food) => (
                      <ListItem
                        key={food._id}
                        food={food.chosenFood}
                        chosenOptions={food.chosenOptions}
                        showSelectBtn={showSelectBtn}
                        onClick={() => handleSelectFood(food)}
                        viewAsCal={viewAsCal}
                      />
                    ))}
                </ReactSortable>
              </ul>
            </div>
            <NoteField
              onChange={(e) => {
                setNote(e.target.value);
              }}
              value={note || ""}
              loading={updateMutation.isLoading}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
