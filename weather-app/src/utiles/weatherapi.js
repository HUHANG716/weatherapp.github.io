import axios from "axios";
import { http } from "./http";

const getWeather = async (cities) => {
  const promiseArr = cities?.map((city) => {
    if (city) {
      return http.get(`/forecast.json?key=5bcb44ae91b44a859ea45015232501&q=${city}&days=1&aqi=no&alerts=no`);
    } else {
      return null;
    }
  });
  const res = await Promise.all(promiseArr);
  const ress = res.filter((item) => item);
  console.log(res);
  return ress.map((res) => {
    if (res) {
      return res.data;
    }
  });
};

const getCities = async (str) => {
  const res = await http.get(`/search.json?key=5bcb44ae91b44a859ea45015232501&q=${str}`);

  return res;
};
export { getWeather, getCities };
