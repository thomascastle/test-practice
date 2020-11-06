import * as React from "react";
import { useRef } from "react";
import { render, screen } from "@testing-library/react";

let idCounter = 1;

const NumberDisplay = ({ number }) => {
  const id = useRef(idCounter++);

  return (
    <div>
      <span data-testid="number-display">{number}</span>
      <span data-testid="instance-id">{id.current}</span>
    </div>
  );
};

it("doesn't remount component", () => {
  const { rerender } = render(<NumberDisplay number={1} />);

  expect(screen.getByTestId("number-display")).toHaveTextContent("1");

  rerender(<NumberDisplay number={2} />);

  expect(screen.getByTestId("number-display")).toHaveTextContent("2");
  expect(screen.getByTestId("instance-id")).toHaveTextContent("1");
});
