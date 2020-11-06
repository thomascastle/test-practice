import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { StateMock } from "@react-mock/state";
import { StatefulCounter } from "./StatefulCounter";

const renderComponent = ({ count }) =>
  render(
    <StateMock state={{ count }}>
      <StatefulCounter />
    </StateMock>
  );

it("renders initial count", async () => {
  const { getByText } = renderComponent({ count: 5 });

  await waitFor(() => getByText(/clicked 5 times/i));
});

it("increments count", async () => {
  const { getByText } = renderComponent({ count: 5 });

  fireEvent.click(getByText("+1"));

  await waitFor(() => getByText(/clicked 6 times/i));
});
