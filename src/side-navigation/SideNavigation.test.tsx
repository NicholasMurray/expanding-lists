import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideNavigation from "./SideNavigation";

describe("SideNavigation", () => {
  test("renders navigation items", () => {
    render(<SideNavigation />);

    expect(screen.getByText(/Item 1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.1.1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 2 title/)).toBeInTheDocument();
  });

  test("toggles navigation items", () => {
    render(<SideNavigation />);

    expect(screen.getByText(/Item 1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 2 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.2 title/)).toBeInTheDocument();

    const item1 = screen.getByText(/Item 1 title/);
    fireEvent.click(item1);

    expect(screen.queryByText("Item 1.1 title")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 1.2 title")).not.toBeInTheDocument();

    fireEvent.click(item1);

    expect(screen.getByText(/Item 1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 2 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.2 title/)).toBeInTheDocument();
  });

  test("expand and contract all items", () => {
    render(<SideNavigation />);

    const toggleButton = screen.getByText("Expand All");
    fireEvent.click(toggleButton);

    expect(screen.getByText(/Item 1.1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.2 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 2.1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 2.2 title/)).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.queryByText("Item 1.1 title")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 1.2 title")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 2.1 title")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 2.2 title")).not.toBeInTheDocument();
  });

  test("renders nested active items initially expanded", () => {
    render(<SideNavigation />);

    expect(screen.getByText(/Item 1.1 title/)).toBeInTheDocument();
    expect(screen.getByText(/Item 1.1.1 title/)).toBeInTheDocument();
    expect(screen.queryByText("Item 2.1 title")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 2.2 title")).not.toBeInTheDocument();
  });
});
