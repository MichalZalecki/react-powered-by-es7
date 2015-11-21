import React    from "react";
import template from "./ClassProperties.jsx";
import moment   from "moment"

class ClassProperties extends React.Component {
  constructor(props) {
    super(props);
  }

  DATE_FORMAT = "MMMM Do YYYY, h:mm:ss a";

  getDate() {
    return moment(this.props.date).format(this.DATE_FORMAT);
  }

  render() {
    return template.call(this);
  }
}

export default ClassProperties;
