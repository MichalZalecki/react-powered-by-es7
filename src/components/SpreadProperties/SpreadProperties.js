import React       from "react";
import template    from "./SpreadProperties.jsx";
import ColorsStore from "app/stores/ColorsStore";

class SpreadProperties extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: "orange|purple|black",
      ...ColorsStore.getState(),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ColorsStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ColorsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  getListItems() {
    return this.state.colors
      .filter(color => new RegExp(`^${this.state.filter}$`).test(color))
      .map(color =>
        <li key={ color } style={ { color } }>{ color }</li>
      );
  }

  render() {
    return template.call(this);
  }
}

export default SpreadProperties;
