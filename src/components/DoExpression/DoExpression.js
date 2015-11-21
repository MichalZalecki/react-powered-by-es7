import React    from "react";
import template from "./DoExpression.jsx";

class DoExpression extends React.Component {
  static propTypes = {
    update:  React.PropTypes.func.isRequired,
    enabled: React.PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.enable  = this.enable.bind(this);
    this.disable = this.disable.bind(this);
  }

  enable() {
    this.props.update(true);
  }

  disable() {
    this.props.update(false);
  }

  render() {
    return template.call(this);
  }
}

export default DoExpression;
