import axios from "axios";
// import store from "../redux/store";

const http = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 3000,
});
let token = "23123";
http.interceptors.request.use(
  (config) => {
    if (token) {
      // console.log('store.getState(): ', store.getState())
      config.headers["access_token"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
