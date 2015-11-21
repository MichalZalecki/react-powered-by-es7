import React       from "react";
import template    from "./SpreadProperties.jsx";
import ColorsStore from "app/stores/ColorsStore";

class SpreadProperties extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ["orange", "purple","black"],
      ...ColorsStore.getState(),
    };

    this.onChange     = this.onChange.bind(this);
    this._colorFilter = this._colorFilter.bind(this);
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
      .filter(this._colorFilter)
      .map(color => <li key={ color } style={ { color } }>{ color }</li> );
  }

  _colorFilter(color) {
    return new RegExp(`^${this.state.filter.join("|")}$`).test(color)
  }

  render() {
    return template.call(this);
  }
}

export default SpreadProperties;
