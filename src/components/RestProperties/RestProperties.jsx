import "./RestProperties.css";
import React from "react";

function template() {
  return (
    <div className="rest-properties" style={ this.props.style }>
      <ul>{ this.getListItems() }</ul>
    </div>
  );
};

export default template;
