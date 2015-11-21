import React    from "react";
import template from "./Decorators.jsx";
import {
  classDecorator,
  propertyDecorator,
  countCalls,
  handleInputChange,
} from "app/decorators/decorator";

@classDecorator
@handleInputChange
class Decorators extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "FooBar",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  @propertyDecorator
  @countCalls
  render() {
    return template.call(this);
  }
}

export default Decorators;
