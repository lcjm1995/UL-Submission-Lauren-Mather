import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MainPage from "./pages/mainPage";

describe("Some Simple Tests", () => {
  beforeEach(() => {
    render(<MainPage />);
  });

  it("The page should be correclty rendered", () => {
    expect(screen.getByPlaceholderText("pageHeader")).toBeInTheDocument();
  });
  it("The Search bar is visible and can have input entered into it", () => {
    expect(screen.getByPlaceholderText("search")).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText("search");
    fireEvent.change(searchInput, { target: { value: "Electrical" } });
  });
  it("The items can be filtered ascending and descending in price", () => {
    expect(screen.getByPlaceholderText("select-sort")).toBeInTheDocument();
    const dropdown = screen.getByPlaceholderText("select-sort");
    fireEvent.click(dropdown);
    const dropdownOption = screen.getByPlaceholderText("descending");
    fireEvent.click(dropdownOption);
  });
});
