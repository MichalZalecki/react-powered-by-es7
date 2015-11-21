import "./DoExpression.css";
import React from "react";

function template() {
  return (
    <div className="do-expression">
      { do {
        if (this.props.enabled) {
          <button onClick={ this.disable }>Disable</button>
        } else {
          <button onClick={ this.enable }>Enable</button>
        }
      } }
    </div>
  );
};

export default template;
