import * as React from "react";
import { render, screen } from "@testing-library/react";

const LazyComponent = React.lazy(() => import("../lazy-component"));

function Main() {
  return (
    <div>
      <div>Lazy-loaded component is here:</div>
      <LazyComponent />
    </div>
  );
}

function App() {
  return (
    <React.Suspense fallback={() => <span>Loading...</span>}>
      <Main />
    </React.Suspense>
  );
}

it("renders component lazily", async () => {
  render(
    <React.Suspense fallback="test-loading...">
      <Main />
    </React.Suspense>
  );

  const lazyElement = await screen.findByText(/i am lazy/gi);

  expect(lazyElement).toBeInTheDocument();
});

it("renders component that contains lazily-loaded components", async () => {
  render(<App />);

  const lazyElement = await screen.findByText(/i am lazy/gi);

  expect(lazyElement).toBeInTheDocument();
});
