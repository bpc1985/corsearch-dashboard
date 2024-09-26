import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { User } from "types";
import { useFilterSort, filterSortReducer } from "./useFilterSort";
import { ActionKind, StateType } from "hooks/useFilterSort/types";

const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    website: "johndoe.com",
    address: {
      street: "Main St",
      suite: "Apt. 1",
      city: "New York",
      zipcode: "10001",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    website: "janesmith.com",
    address: {
      street: "Broadway",
      suite: "Apt. 2",
      city: "Los Angeles",
      zipcode: "90001",
    },
  },
];

describe("filterSortReducer", () => {
  it("should set filter text", () => {
    const initialState = {
      filterText: "",
      sortField: "name",
      sortDirection: "asc",
    } as StateType;

    const newState = filterSortReducer(initialState, {
      type: ActionKind.SET_FILTER_TEXT,
      payload: "test",
    });

    expect(newState.filterText).toBe("test");
  });

  it("should toggle sort direction on the same field", () => {
    const initialState = {
      filterText: "",
      sortField: "name",
      sortDirection: "asc",
    } as StateType;

    const newState = filterSortReducer(initialState, {
      type: ActionKind.SET_SORT_FIELD,
      payload: "name",
    });

    expect(newState.sortDirection).toBe("desc");
  });

  it("should set sort direction to asc when switching fields", () => {
    const initialState = {
      filterText: "",
      sortField: "name",
      sortDirection: "asc",
    } as StateType;

    const newState = filterSortReducer(initialState, {
      type: ActionKind.SET_SORT_FIELD,
      payload: "email",
    });

    expect(newState.sortField).toBe("email");
    expect(newState.sortDirection).toBe("asc"); // Reset to ascending
  });

  it("should set sort direction directly", () => {
    const initialState = {
      filterText: "",
      sortField: "name",
      sortDirection: "asc",
    } as StateType;

    const newState = filterSortReducer(initialState, {
      type: ActionKind.SET_SORT_DIRECTION,
      payload: "desc",
    });

    expect(newState.sortDirection).toBe("desc");
  });
});

describe("useFilterSort", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should filter users based on filter text", () => {
    const { result } = renderHook(() => useFilterSort(users));

    act(() => {
      result.current.handleFilterChange("Jane");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.filteredAndSortedUsers).toEqual([users[1]]);
  });

  it("should sort users based on sort field and direction", () => {
    const { result } = renderHook(() => useFilterSort(users));
    expect(result.current.filteredAndSortedUsers[0].name).toBe("Jane Smith");

    act(() => {
      result.current.handleSortChange("email");
    });

    expect(result.current.filteredAndSortedUsers[0].email).toBe(
      "jane@example.com"
    );

    act(() => {
      result.current.handleSortChange("email");
    });

    expect(result.current.filteredAndSortedUsers[0].email).toBe(
      "john@example.com"
    );
  });
});
