import "./FunctionBindSyntax.css";
import React from "react";

function template() {
  return (
    <div className="function-bind-syntax">
      <h1>Function Bind Syntax</h1>
      <button onClick={ this.click1.bind(this) }>Click 1</button>
      <button onClick={ this.click2 }>Click 2</button>
      <button onClick={ ::this.click3 }>Click 3</button>
      <h3>Clicks: { this.state.clicks }</h3>
    </div>
  );
};

export default template;
