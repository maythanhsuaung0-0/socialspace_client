import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (config.data && config.data.user) {
      delete config.data.user;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    if(error.response.status === 401 || error.response.status === 403){
      localStorage.clear()
      window.location.href = "/account/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
