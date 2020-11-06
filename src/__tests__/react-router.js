import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";

const About = () => <div>You are on the About page</div>;
const Home = () => <div>You are on the Home page</div>;
const NoMatch = () => <div>We do not find anything</div>;

const LocationDisplay = () => {
  const location = useLocation();

  return <div data-testid="location-display">{location.pathname}</div>;
};

const App = () => (
  <div>
    <Link to="/home">Home</Link>
    <Link to="/about">About</Link>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
    <LocationDisplay />
  </div>
);

const helpRender = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(ui, { wrapper: Router });
};

it("renders Home page", () => {
  helpRender(<App />);

  expect(screen.getByText(/you are on the home page/i)).toBeInTheDocument();
});

it("follows the link", () => {
  helpRender(<App />);

  userEvent.click(screen.getByText(/about/i));

  expect(screen.getByText(/you are on the about page/i)).toBeInTheDocument();
});

it("displays default NotFound page", () => {
  helpRender(<App />, { route: "/something-that-does-not-match" });

  expect(screen.getByText(/we do not find anything/i)).toBeInTheDocument();
});

it("renders correct pathname", () => {
  const route = "/some-route";

  helpRender(<LocationDisplay />, { route });

  expect(screen.getByTestId("location-display")).toHaveTextContent(route);
});
