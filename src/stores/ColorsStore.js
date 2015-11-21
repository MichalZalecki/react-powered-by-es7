import alt from "app/alt";

class ColorsStore {
  constructor() {
    this.state = {
      colors: [ "red", "blue", "purple", "orange", "yellow", "green" ],
    };
  }
}

export default alt.createStore(ColorsStore, "ColorsStore");
