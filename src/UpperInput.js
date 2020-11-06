import * as React from "react";

class UpperInput extends React.Component {
  state = { upper: "" };

  onUpperChange = (e) => {
    this.setState({ upper: e.target.value.toUpperCase() });
  };

  render() {
    return (
      <div>
        <label htmlFor="upper">Upper</label>
        <input
          id="upper"
          value={this.state.upper}
          onChange={this.onUpperChange}
        />
      </div>
    );
  }
}

export { UpperInput };
