import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";
import * as useUsersHook from "hooks/useUsers/useUsers";
import * as useFilterSortHook from "hooks/useFilterSort/useFilterSort";

describe("App Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: [],
      isLoading: true,
      error: null,
    });

    render(<App />);

    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();
  });

  it("renders error message", () => {
    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: [],
      isLoading: false,
      error: "Failed to fetch users.",
    });

    render(<App />);

    expect(screen.getByText(/Failed to fetch users./i)).toBeInTheDocument();
  });

  it("renders user list and filter/sort components", () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        website: "john.com",
        address: {
          street: "123 Main St",
          suite: "Apt 1",
          city: "Anytown",
          zipcode: "12345",
        },
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210",
        website: "jane.com",
        address: {
          street: "456 Main St",
          suite: "Apt 2",
          city: "Othertown",
          zipcode: "54321",
        },
      },
    ];

    vi.spyOn(useUsersHook, "useUsers").mockReturnValue({
      users: mockUsers,
      isLoading: false,
      error: null,
    });

    vi.spyOn(useFilterSortHook, "useFilterSort").mockReturnValue({
      filterText: "",
      sortField: "name",
      sortDirection: "asc",
      filteredAndSortedUsers: mockUsers,
      handleFilterChange: vi.fn(),
      handleSortChange: vi.fn(),
    });

    render(<App />);

    expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });
});
