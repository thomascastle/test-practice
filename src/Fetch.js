import * as React from "react";
import axios from "axios";

const initialState = {
  error: null,
  greeting: null,
};

function greetingReducer(state, action) {
  switch (action.type) {
    case "SUCCESS": {
      return {
        error: null,
        greeting: action.greeting,
      };
    }
    case "ERROR": {
      return {
        error: action.error,
        greeting: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default function Fetch({ url }) {
  const [{ error, greeting }, dispatch] = React.useReducer(
    greetingReducer,
    initialState
  );
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const fetchGreeting = async () => {
    axios
      .get(url)
      .then((response) => {
        const { data } = response;
        const { greeting } = data;
        dispatch({ type: "SUCCESS", greeting });
        setButtonClicked(true);
      })
      .catch((error) => {
        dispatch({ type: "ERROR", error });
      });
  };
  const buttonText = buttonClicked ? "Ok" : "Load Greeting";

  return (
    <div>
      <button onClick={fetchGreeting} disabled={buttonClicked}>
        {buttonText}
      </button>
      {greeting && <h1>{greeting}</h1>}
      {error && <p role="alert">Oops, failed to fetch!</p>}
    </div>
  );
}
