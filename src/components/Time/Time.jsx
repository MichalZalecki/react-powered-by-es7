import "./Time.css";
import React from "react";

function template() {
  return (
    <div className="time">
      <h1>{ this.getDate() }</h1>
    </div>
  );
};

export default template;
