import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  amount: PropTypes.number,
};

export default function PlaceholderListItem({ amount }) {
  const Placeholder = () => (
    <li className="animate-pulse border-b">
      <div className="flex-auto">
        <div className="flex justify-between">
          <span className="w-56 h-4 bg-gray-300 m-1 rounded" />
          <span className="w-32 h-3 bg-gray-300 m-1 rounded" />
        </div>
        <div className="flex justify-between">
          <span className="w-32 h-4 bg-gray-300 m-1 rounded" />
          <span className="w-24 h-3 bg-gray-300 m-1 rounded" />
        </div>
      </div>
    </li>
  );

  return [...Array(amount)].map((_, i) => <Placeholder key={i} />);
}

PlaceholderListItem.propTypes = propTypes;
