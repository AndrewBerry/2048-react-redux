import React from "react";
import propTypes from "prop-types";

import "./Scorebox.css";

export class Scorebox extends React.Component {
  state = {
    delta: 0,
    lastDeltaChange: 0
  };

  componentDidUpdate(previousProps) {
    if (this.props.score === previousProps.score) {
      return;
    }

    const delta = this.props.score - previousProps.score;
    if (delta > 0) {
      this.setState({
        delta,
        lastDeltaChange: Date.now()
      });
    }
  }

  render() {
    return (
      <div className={`Scorebox ${this.props.className || ''} ${this.props.isLarge ? 'Scorebox--large' : null}`}>
        {this.state.delta > 0 && (
          <div className="Scorebox__delta" key={this.state.lastDeltaChange}>
            +{this.state.delta}
          </div>
        )}

        <div className="Scorebox__label">{this.props.label}</div>
        <div className="Scorebox__score">{this.props.score}</div>
      </div>
    );
  }
}

Scorebox.propTypes = {
  label: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  isLarge: propTypes.bool
};
