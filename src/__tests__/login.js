// Link: https://kentcdodds.com/blog/avoid-nesting-when-youre-testing
// The component we want to test
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

function Login({ onSubmit }) {
  const [error, setError] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const {
      usernameInput: { value: username },
      passwordInput: { value: password },
    } = event.target.elements;

    if (!username) {
      setError("username is required");
    } else if (!password) {
      setError("password is required");
    } else {
      setError("");
      onSubmit({ username, password });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="usernameInput">Username</label>
          <input id="usernameInput" />
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input id="passwordInput" />
        </div>
        <button type="submit">Submit</button>
      </form>
      {error ? <div role="alert">{error}</div> : null}
    </div>
  );
}

// THE BAD
// Over-abstraction
// This kind of abstraction does not really give us a whole lot of benefit
// for this small set of tests
// Nesting
// Tracing through the code to keep track of the variables and their values
// over time is the number one reason I strongly recommend against nested tests.
describe("Login", () => {
  let utils,
    handleSubmit,
    user,
    changeUsernameInput,
    changePasswordInput,
    clickSubmit;

  beforeEach(() => {
    handleSubmit = jest.fn();
    user = { username: "michelle", password: "smith" };
    utils = render(<Login onSubmit={handleSubmit} />);
    changeUsernameInput = (value) =>
      userEvent.type(utils.getByLabelText(/username/i), value);
    changePasswordInput = (value) =>
      userEvent.type(utils.getByLabelText(/password/i), value);
    clickSubmit = () => userEvent.click(utils.getByText(/submit/i));
  });

  describe("when provided username and password", () => {
    beforeEach(() => {
      changeUsernameInput(user.username);
      changePasswordInput(user.password);
    });

    describe("when submit button is clicked", () => {
      beforeEach(() => {
        clickSubmit();
      });

      it("should call onSubmit with username and password", () => {
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(user);
      });
    });
  });

  describe("when password is not provided", () => {
    beforeEach(() => {
      changeUsernameInput(user.username);
    });

    describe("when submit button is clicked", () => {
      let errorMessage;
      beforeEach(() => {
        clickSubmit();
        errorMessage = utils.getByRole("alert");
      });

      it("should show an error message", () => {
        expect(errorMessage).toHaveTextContent(/password is required/i);
      });
    });
  });

  describe("when username is not provided", () => {
    beforeEach(() => {
      changePasswordInput(user.password);
    });

    describe("when submit button is clicked", () => {
      let errorMessage;
      beforeEach(() => {
        clickSubmit();
        errorMessage = utils.getByRole("alert");
      });

      it("should show an error message", () => {
        expect(errorMessage).toHaveTextContent(/username is required/i);
      });
    });
  });
});

// THE GOOD
// There is a bit of duplication but look at how clear these tests are.
// The entire test should be self-contained.
it("calls onSubmit with the username and password when submit button is clicked", () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText } = render(
    <Login onSubmit={handleSubmit} />
  );
  const user = { username: "michelle", password: "smith" };

  userEvent.type(getByLabelText(/username/i), user.username);
  userEvent.type(getByLabelText(/password/i), user.password);
  userEvent.click(getByText(/submit/i));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
  expect(handleSubmit).toHaveBeenCalledWith(user);
});

it("shows an error message when no username is provided", () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText, getByRole } = render(
    <Login onSubmit={handleSubmit} />
  );

  userEvent.type(getByLabelText(/password/i), "anything");
  userEvent.click(getByText(/submit/i));
  const errorMessage = getByRole("alert");

  expect(errorMessage).toHaveTextContent(/username is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});

it("shows an error message when no password is provided", () => {
  const handleSubmit = jest.fn();
  const { getByLabelText, getByText, getByRole } = render(
    <Login onSubmit={handleSubmit} />
  );

  userEvent.type(getByLabelText(/username/i), "anything");
  userEvent.click(getByText(/submit/i));
  const errorMessage = getByRole("alert");

  expect(errorMessage).toHaveTextContent(/password is required/i);
  expect(handleSubmit).not.toHaveBeenCalled();
});
