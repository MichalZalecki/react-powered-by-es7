import alt   from "app/alt";
import axios from "axios";

class UsersActions {
  constructor() {
    this.generateActions("fetchSuccess", "fetchFail");
  }

  async fetch(username) {
    this.dispatch();
    try {
      const { data: { name, repos_url } } = await axios.get(`https://api.github.com/users/${username}`);
      const { data: repos }               = await axios.get(repos_url);

      this.actions.fetchSuccess({ name, repos });
    } catch(e) {
      this.actions.fetchFail(e);
    }
  }
}

export default alt.createActions(UsersActions);
