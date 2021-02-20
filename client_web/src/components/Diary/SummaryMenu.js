import React from "react";
import { useAuth } from "hooks/useAuth";

export default function SummaryMenu({ totalEatenKJ }) {
  const { user } = useAuth();
  const goal = user.goals.energyGoalKJ;

  const remaining = {
    value: goal - totalEatenKJ,
    isOver: goal < totalEatenKJ,
    percent: ((totalEatenKJ / goal) * 100).toFixed(),
  };

  console.log({ remaining });
  return (
    <div className="inline-grid grid-cols-4 divide-x text-center items-center w-64">
      <div>
        <h6 className={remaining.isOver && "text-red-500"}>
          {remaining.percent}%
        </h6>
      </div>
      <div>
        <small className="text-gray-600">Goal</small>
        <p className="m-0">{goal}</p>
      </div>
      <div>
        <small className="text-gray-600">Eaten</small>
        <p className={remaining.isOver && "text-red-500"}>{totalEatenKJ}</p>
      </div>
      <div>
        <small className="text-gray-600">Left</small>
        <p className={remaining.isOver && "text-red-500"}>{remaining.value}</p>
      </div>
    </div>
  );
}
