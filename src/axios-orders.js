import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-buger-builder-31d40.firebaseio.com/"
});

export default instance;
