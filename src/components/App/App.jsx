import "./App.css";
import React from "react";
import ClassProperties  from "app/components/ClassProperties";
import DoExpression     from "app/components/DoExpression";
import RestProperties   from "app/components/RestProperties";
import SpreadProperties from "app/components/SpreadProperties";
import User             from "app/components/User";

export default function () {
  return (
    <div className="app">
      <ClassProperties
        date={ this.state.date }
      />
      <DoExpression
        update={ this.setEnabled }
        enabled={ this.state.enabled }
      />
      <RestProperties
        first_name="Michal"
        last_name="Zalecki"
        company="Woumedia"
        style={ { color: "#BADA55" } }
      />
      <SpreadProperties />
      <User username="MichalZalecki" />
    </div>
  );
};
