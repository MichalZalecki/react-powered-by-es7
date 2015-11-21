import "./Decorators.css";
import React from "react";

function template() {
  return (
    <div className="decorators">
      <h1>{ this.state.name }</h1>
      <input
        type="text"
        name="name"
        value={ this.state.name }
        onChange={ this.handleInputChange }
      />
      <h2>called: { this.render_counter }</h2>
    </div>
  );
};

export default template;
