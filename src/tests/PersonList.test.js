import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PersonList from "../components/PersonList";
import "@testing-library/jest-dom";

describe("PersonList", () => {
  const mockPersons = {
    1: {
      name: { first: "Jane", last: "Doe" },
      location: { country: "United States" },
      email: "jane.doe@example.com",
      login: { uuid: "1" },
      dob: { age: 25 },
      picture: { large: "https://randomuser.me/api/portraits/women/75.jpg" },
      id: "1",
    },
    2: {
      name: { first: "John", last: "Doe" },
      location: { country: "Canada" },
      email: "john.doe@example.com",
      login: { uuid: "2" },
      dob: { age: 30 },
      picture: { large: "https://randomuser.me/api/portraits/men/75.jpg" },
      id: "2",
    },
  };

  beforeEach(() => {
    render(
      <Router>
        <PersonList persons={mockPersons} />
      </Router>
    );
  });

  it("renders persons", async () => {
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(Object.keys(mockPersons).length);
  });

  it("filters by country", async () => {
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "canada" },
    });
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(1)
    );
  });

  it("searches by name", async () => {
    fireEvent.change(screen.getByPlaceholderText("Search by name..."), {
      target: { value: "John" },
    });
    await waitFor(() =>
      expect(screen.getAllByRole("listitem")).toHaveLength(1)
    );
  });

  it("shows contact count", () => {
    expect(screen.getByText(/Contacts: 2/)).toBeInTheDocument();
  });

  it("updates contact count when filtering", async () => {
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "canada" },
    });

    await waitFor(() =>
      expect(screen.getByText(/Contacts: 1/)).toBeInTheDocument()
    );
  });

  it("updates contact count when searching", async () => {
    fireEvent.change(screen.getByPlaceholderText("Search by name..."), {
      target: { value: "John" },
    });

    await waitFor(() =>
      expect(screen.getByText(/Contacts: 1/)).toBeInTheDocument()
    );
  });
});
