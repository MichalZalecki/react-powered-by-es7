import "./ClassProperties.css";
import React from "react";

function template() {
  return (
    <div className="class-properties">
      <h1>{ this.getDate() }</h1>
    </div>
  );
};

export default template;
