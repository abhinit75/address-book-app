import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

test("renders app title", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Address Book App/i);
  expect(linkElement).toBeInTheDocument();
});
