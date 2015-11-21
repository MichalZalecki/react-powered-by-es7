import "./App.css";
import React from "react";
import Time  from "app/components/Time";
import DoExpression     from "app/components/DoExpression";
import RestProperties   from "app/components/RestProperties";
import SpreadProperties from "app/components/SpreadProperties";
import User             from "app/components/User";
import Decorators       from "app/components/Decorators";

export default function () {
  return (
    <div className="app">
      <Time
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
      <Decorators />
    </div>
  );
};
