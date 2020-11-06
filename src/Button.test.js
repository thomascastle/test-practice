import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Button } from "./Button";

it("calls onClick prop on button click", () => {
  const clickHandler = jest.fn();
  // const { getByText } = render(<Button onClick={clickHandler} />);
  render(<Button onClick={clickHandler} />);

  fireEvent.click(screen.getByText(/click me nao/i));

  expect(clickHandler).toHaveBeenCalled();
});
