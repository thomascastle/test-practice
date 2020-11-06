import React from "react";
import { MemoryRouter, Route } from "react-router";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { UserWithRouter } from "./UserWithRouter";

const renderComponent = ({ userId }) =>
  render(
    <MemoryRouter initialEntries={[`/users/${userId}`]}>
      <Route path="/users/:userId">
        <UserWithRouter />
      </Route>
    </MemoryRouter>
  );

it("renders initial user id", async () => {
  const { getByText } = renderComponent({ userId: 5 });

  await waitFor(() => getByText(/user #5/i));
});

it("renders next user id", async () => {
  const { getByText } = renderComponent({ userId: 5 });

  fireEvent.click(getByText(/next user/i));
  await waitFor(() => getByText(/user #6/i));
});
