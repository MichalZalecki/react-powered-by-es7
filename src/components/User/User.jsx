import "./User.css";
import React from "react";

function template() {
  return (
    <div className="user">
      <h1>{ this.userReady() ? `${this.getName()} (${this.getLangs()})` : "..." }</h1>
    </div>
  );
};

export default template;
