import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PersonDetails from "../components/PersonDetails";

test("renders person information", () => {
  const mockPersons = [
    {
      name: { first: "John", last: "Doe" },
      email: "john.doe@example.com",
      dob: { age: 30 },
      picture: { large: "https://randomuser.me/api/portraits/men/75.jpg" },
      location: {
        street: { name: "Main St", number: 123 },
        city: "Springfield",
        state: "Illinois",
        country: "United States",
      },
      login: {
        username: "johndoe",
      },
      // add other properties if required by PersonDetails
    },
    // add more persons if required
  ];

  render(
    <MemoryRouter initialEntries={["/person/0"]}>
      <Routes>
        <Route
          path="/person/:id"
          element={<PersonDetails persons={mockPersons} />}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  const emailElements = screen.getAllByText(/john.doe@example.com/);
  emailElements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
  expect(screen.getByText(/United States/)).toBeInTheDocument();
  expect(screen.getByText(/johndoe/)).toBeInTheDocument(); // added check for username
});
