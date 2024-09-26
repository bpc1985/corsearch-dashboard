import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterSort, FilterSortProps } from "./FilterSort";

describe("FilterSort Component", () => {
  const mockOnFilterChange = vi.fn();
  const mockOnSortChange = vi.fn();

  const initialProps = {
    filterText: "",
    onFilterChange: mockOnFilterChange,
    sortField: "name",
    sortDirection: "asc",
    onSortChange: mockOnSortChange,
  } as FilterSortProps;

  it("renders filter input and sort buttons", () => {
    render(<FilterSort {...initialProps} />);

    // Check filter input is rendered
    const filterInput = screen.getByPlaceholderText("Filter users...");
    expect(filterInput).toBeInTheDocument();

    // Check sort by name button
    const nameSortButton = screen.getByText("Sort by Name ↑");
    expect(nameSortButton).toBeInTheDocument();

    // Check sort by email button
    const emailSortButton = screen.getByText("Sort by Email");
    expect(emailSortButton).toBeInTheDocument();
  });

  it("calls onFilterChange when typing in the filter input", () => {
    render(<FilterSort {...initialProps} />);

    const filterInput = screen.getByPlaceholderText("Filter users...");
    fireEvent.change(filterInput, { target: { value: "John" } });

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("John");
  });

  it("calls onSortChange when clicking on sort buttons", () => {
    render(<FilterSort {...initialProps} />);

    const nameSortButton = screen.getByText("Sort by Name ↑");
    const emailSortButton = screen.getByText("Sort by Email");

    fireEvent.click(emailSortButton);
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith("email");

    fireEvent.click(nameSortButton);
    expect(mockOnSortChange).toHaveBeenCalledTimes(2);
    expect(mockOnSortChange).toHaveBeenCalledWith("name");
  });

  it("displays correct sort direction arrows", () => {
    // Test for ascending sort direction
    render(
      <FilterSort {...initialProps} sortField="email" sortDirection="asc" />
    );
    expect(screen.getByText("Sort by Email ↑")).toBeInTheDocument();

    // Test for descending sort direction
    render(
      <FilterSort {...initialProps} sortField="email" sortDirection="desc" />
    );
    expect(screen.getByText("Sort by Email ↓")).toBeInTheDocument();
  });
});
