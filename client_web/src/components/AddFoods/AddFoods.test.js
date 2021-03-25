import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddFoods from "./index";

describe("AddFoods", () => {
  test("renders AddFoods component", () => {
    render(<AddFoods />);

    screen.debug();
  });
});
