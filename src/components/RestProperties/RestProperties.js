import React      from "react";
import template   from "./RestProperties.jsx";
import changeCase from "change-case";

class RestProperties extends React.Component {
  getListItems() {
    const { style, ...data } = this.props;
    return Object.keys(data).map(key =>
      <li key={key}>
        { changeCase.titleCase(key) }: <strong>{ data[key] }</strong>
      </li>
    );
  }

  render() {
    return template.call(this);
  }
}

export default RestProperties;
