import React from "react";
import { useAuth } from "hooks/useAuth";
import { toCal } from "utils/foodEnegy";

export default function SummaryMenu({ totalEatenKJ, viewAsCal }) {
  const { user } = useAuth();
  let goal = user.goals.energyGoalKJ;

  if (viewAsCal) {
    goal = toCal(goal);
    totalEatenKJ = toCal(totalEatenKJ);
  }

  const remaining = {
    value: goal - totalEatenKJ,
    isOver: goal < totalEatenKJ,
    percent: ((totalEatenKJ / goal) * 100).toFixed(),
  };

  return (
    <div className="inline-grid grid-cols-4 divide-x text-center items-center w-64">
      <div>
        <h6 className={remaining.isOver ? "text-red-500" : undefined}>
          {!goal ? "-" : `${remaining.percent}%`}
        </h6>
      </div>

      <div>
        <small className="text-gray-600">Goal</small>
        <p className="m-0">{!goal ? "Not set" : goal}</p>
      </div>

      <div>
        <small className="text-gray-600">Eaten</small>
        <p className={remaining.isOver ? "text-red-500" : undefined}>
          {totalEatenKJ}
        </p>
      </div>

      <div>
        <small className="text-gray-600">Left</small>
        <p className={remaining.isOver ? "text-red-500" : undefined}>
          {!goal ? "-" : remaining.value}
        </p>
      </div>
    </div>
  );
}
