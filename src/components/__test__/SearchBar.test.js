import React from "react";
import { render, getByPlaceholderText } from "@testing-library/react";
import { SearchBar } from "../SearchBar";

test("Search bar renders with default placeholder text", () => {
  const { debug } = render(<SearchBar />);
  debug();
});
