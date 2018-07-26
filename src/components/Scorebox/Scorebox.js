import React from "react";
import propTypes from "prop-types";

import "./Scorebox.css"

export class Scorebox extends React.Component {
  state = {
    lastChange: null,
  }

  render() {
    return (
      <div className={`Scorebox ${this.props.className}`}>
        <div className="Scorebox__label">{this.props.label}</div>
        <div className="Scorebox__score">{this.props.score}</div>
      </div>
    );
  }
}

Scorebox.propTypes = {
  label: propTypes.string.isRequired,
  score: propTypes.number.isRequired
};
