import React    from "react";
import template from "./FunctionBindSyntax.jsx";

class FunctionBindSyntax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    };

    this.click2 = this.click2.bind(this);
  }

  click1() {
    console.log("Click 1");
    this.setState({ clicks: this.state.clicks+1 });
  }

  click2() {
    console.log("Click 2");
    this.setState({ clicks: this.state.clicks+2 });
  }

  click3() {
    console.log("Click 3");
    this.setState({ clicks: this.state.clicks+3 });
  }

  render() {
    return template.call(this);
  }
}

export default FunctionBindSyntax;
