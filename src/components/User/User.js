import React        from "react";
import template     from "./User.jsx";
import UsersStore   from "app/stores/UsersStore";
import UsersActions from "app/actions/UsersActions";

class User extends React.Component {
  static propTypes = {
    username: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...UsersStore.getState(),
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UsersStore.listen(this.onChange);

    UsersActions.fetch(this.props.username);
  }

  componentWillUnmount() {
    UsersActions.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  userReady() {
    return !this.state.user.loading && !this.state.user.error;
  }

  getName() {
    return this.state.user.name;
  }

  getLangs() {
    return this.state.user.langs.map(lang => `${lang.name} - ${lang.count}`).join(", ");
  }

  render() {
    return template.call(this);
  }
}

export default User;
