import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ServerCounter } from "./ServerFetchCounter";

const server = setupServer(
  rest.get("/count", (req, res, ctx) => {
    return res(ctx.json({ count: 5 }));
  }),
  rest.post("/count", (req, res, ctx) => {
    return res(ctx.json({ count: 6 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders initial count", async () => {
  const { getByText } = render(<ServerCounter />);

  await waitFor(() => getByText(/clicked 5 times/i));
});

it("increments count ", async () => {
  const { getByText } = render(<ServerCounter />);

  await waitFor(() => getByText("+1"));
  fireEvent.click(getByText("+1"));

  await waitFor(() => getByText(/clicked 6 times/i));
});
