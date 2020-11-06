import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { reportError } from "../utils";
import { BombButton } from "../component-did-catch";

jest.mock("../utils", () => {
  return {
    reportError: jest.fn(() => Promise.resolve({ success: true })),
  };
});

beforeEach(() => {
  jest.spyOn(console, "error");
  console.error.mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
});

it("calls reportError and renders that there was a problem", () => {
  render(<BombButton />);

  userEvent.click(screen.getByText("💣"));

  expect(reportError).toHaveBeenCalledTimes(1);
  const error = expect.any(TypeError);
  const info = { componentStack: expect.stringContaining("BombButton") };
  expect(reportError).toHaveBeenCalledWith(error, info);
  expect(screen.getByText(/there was a problem/i)).toBeInTheDocument();
  expect(console.error).toHaveBeenCalledTimes(2);
});
