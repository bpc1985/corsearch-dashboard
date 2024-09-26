import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { User } from "types";
import { UserList } from "./UserList";

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    website: "johndoe.com",
    address: {
      street: "123 Main St",
      suite: "Apt 1",
      city: "Cityville",
      zipcode: "12345",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    website: "janesmith.com",
    address: {
      street: "456 Elm St",
      suite: "Apt 2",
      city: "Townsville",
      zipcode: "54321",
    },
  },
];

describe("UserList Component", () => {
  it("renders without crashing", () => {
    render(<UserList users={mockUsers} />);
    // Check if the component is rendered
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
  });

  it("renders correct number of users", () => {
    render(<UserList users={mockUsers} />);
    // Check if the correct number of user cards is rendered
    const userCards = screen.getAllByRole("heading", { level: 2 });
    expect(userCards.length).toBe(mockUsers.length);
  });

  it("renders user details correctly", () => {
    render(<UserList users={mockUsers} />);

    // Test first user's details
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
    expect(screen.getByText(/johndoe.com/i)).toBeInTheDocument();
    expect(
      screen.getByText(/123 Main St, Apt 1, Cityville, 12345/i)
    ).toBeInTheDocument();

    // Test second user's details
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText(/jane.smith@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/987-654-3210/i)).toBeInTheDocument();
    expect(screen.getByText(/janesmith.com/i)).toBeInTheDocument();
    expect(
      screen.getByText(/456 Elm St, Apt 2, Townsville, 54321/i)
    ).toBeInTheDocument();
  });
});
