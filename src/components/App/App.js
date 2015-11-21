import React    from "react";
import template from "./App.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "1999-01-02 13:01",
      enabled: false,
    }

    this.setEnabled = this.setEnabled.bind(this);
  }

  setEnabled(enabled) {
    this.setState({ enabled });
  }

  render() {
    return template.call(this);
  }
}

export default App;
