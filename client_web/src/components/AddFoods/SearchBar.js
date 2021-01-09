import React from "react";
import { Button } from "components/shared/styling";

export default function SearchBar() {
  return (
    <div className="flex justify-between pb-2">
      <input className="mr-2 w-full" type="text" placeholder="search..." />
      <Button color="green">Search</Button>
    </div>
  );
}
