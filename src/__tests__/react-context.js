import * as React from "react";
import { render, screen } from "@testing-library/react";
import { NameContext, NameProvider, NameConsumer } from "../react-context";

it("shows default value", () => {
  render(<NameConsumer />);

  expect(screen.getByText(/^My Name Is:/)).toHaveTextContent(
    "My Name Is: Unknown"
  );
});

it("shows value from provider", () => {
  render(
    <NameContext.Provider value="C3P0">
      <NameConsumer />
    </NameContext.Provider>
  );

  expect(screen.getByText(/^My Name Is:/)).toHaveTextContent(
    "My Name Is: C3P0"
  );
});

it("composes full name", () => {
  render(
    <NameProvider first="Boba" last="Fett">
      <NameContext.Consumer>
        {(value) => <span>Received: {value}</span>}
      </NameContext.Consumer>
    </NameProvider>
  );

  expect(screen.getByText(/^Received:/).textContent).toBe(
    "Received: Boba Fett"
  );
});

it("shows name of character", () => {
  render(
    <NameProvider first="Leia" last="Organa">
      <NameConsumer />
    </NameProvider>
  );

  expect(screen.getByText(/^My Name Is:/).textContent).toBe(
    "My Name Is: Leia Organa"
  );
});
