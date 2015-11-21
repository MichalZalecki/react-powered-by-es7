import "./SpreadProperties.css";
import React from "react";

function template() {
  return (
    <div className="spread-properties">
      <ul>{ this.getListItems() }</ul>
    </div>
  );
};

export default template;
