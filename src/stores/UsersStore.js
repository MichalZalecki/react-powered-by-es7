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
    const langs = _.pairs(([for ({ language } of user.repos) language])
      .filter(this._castToBool)
      .reduce(this._reduceToCountLangs, {}))
      .map(this._mapToNameCount)
      .sort(this._sortByCount);

    // function __(name, ...args) {
    //   return _[name](this, ...args);
    // }

    // const langs = [for ({ language } of user.repos) language]
    //   ::__("filter", this._castToBool)
    //   ::__("reduce", this._reduceToCountLangs, {})
    //   ::__("pairs")
    //   ::__("map",    this._mapToNameCount)
    //   ::__("sortBy", "count")
    //   .reverse();

    this.setState({ user: { ...user, langs, loading: false, error: null } });
  }

  handleFetchFail(error) {

    this.setState({ user: { langs: [], loading: false, error } });
  }

  _mapToNameCount(lang) {
    return { name: lang[0], count: lang[1] }
  }

  _sortByCount(a, b) {
    if ( a.count > b.count ) return -1;
    if ( a.count < b.count ) return 1;
    return 0;
  }

  _reduceToCountLangs(acc, lang) {
    return { ...acc, [lang]: (acc[lang] || 0) + 1 };
  }

  _castToBool(item) {
    return !!item
  }
}

export default alt.createStore(UserStore, "UserStore");
