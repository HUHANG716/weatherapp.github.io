import axios from "axios";

const http = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
  timeout: 5000,
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { http };
