import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { UpperInput } from "../UpperInput";

it("sets the value to upper-case", () => {
  render(<UpperInput />);

  const upperInput = screen.getByLabelText(/upper/i);
  const text = "stuff";
  userEvent.type(upperInput, text);

  expect(upperInput.value).toEqual(text.toUpperCase());
});

it("uses click event for checkboxes (and radios)", () => {
  const handleChange = jest.fn();
  const { container } = render(
    <input type="checkbox" onChange={handleChange} />
  );
  const checkbox = container.firstChild;

  userEvent.click(checkbox);

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(checkbox.checked).toBe(true);
});
