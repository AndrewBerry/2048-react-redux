import React from "react";
import propTypes from "prop-types";

import "./Scorebox.css"

export const Scorebox = ({ label, score }) => (
  <div className="Scorebox">
    <div className="Scorebox__label">{label}</div>
    <div className="Scorebox__score">{score}</div>
  </div>
);

Scorebox.propTypes = {
  label: propTypes.string.isRequired,
  score: propTypes.number.isRequired
};
