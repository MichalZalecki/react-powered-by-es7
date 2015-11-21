import alt          from "app/alt";
import UsersActions from "app/actions/UsersActions";
import _            from "lodash";

class UserStore {
  constructor() {
    this.state = {
      user: {
        loading: false,
        error: null,
        langs: [],
      },
    };

    this.bindListeners({
      handleFetch:        UsersActions.FETCH,
      handleFetchSuccess: UsersActions.FETCH_SUCCESS,
      handleFetchFail:    UsersActions.FETCH_FAIL,
    });
  }

  handleFetch() {
    this.setState({ user: { ...this.state.user, loading: true, error: null } });
  }

  handleFetchSuccess(user) {
    const langs = _(user.repos)
      .map(({ language }) => language)
      .compact()
      .uniq()
      .value();

    this.setState({ user: { ...user, langs, loading: false, error: null } });
  }

  handleFetchFail(error) {
    this.setState({ user: { langs: [], loading: false, error } });
  }
}

export default alt.createStore(UserStore, "UserStore");
