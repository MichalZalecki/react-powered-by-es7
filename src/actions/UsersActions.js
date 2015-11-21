import alt   from "app/alt";
import axios from "axios";

class UsersActions {
  constructor() {
    this.generateActions("fetchSuccess", "fetchFail");
  }

  // async fetch(username) {
  //   this.dispatch();
  //   try {
  //     const { data: { name, repos_url } } = await axios.get(`https://api.github.com/users/${username}`);
  //     const { data: repos }               = await axios.get(repos_url);

  //     this.actions.fetchSuccess({ name, repos });
  //   } catch(e) {
  //     this.actions.fetchFail(e);
  //   }
  // }

  fetch(username)  {
    function run(g) {
      const it = g();

      (function _iterate(res) {

        !res.done && res.value
          .then(data => _iterate(it.next(data)))
          .catch(data => it.throw(data));

      })(it.next());
    }

    run((function*() {
      this.dispatch();
      try {
        const { data: { name, repos_url } } = yield axios.get(`https://api.github.com/users/${username}`);
        const { data: repos }               = yield axios.get(repos_url);

        this.actions.fetchSuccess({ name, repos });
      } catch (e) {
        this.actions.fetchFail(e);
      }
    }).bind(this));
  }
}

export default alt.createActions(UsersActions);
