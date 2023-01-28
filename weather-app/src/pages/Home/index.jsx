import { Spin } from "antd";
import React, { useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
import { useState } from "react";
import { getWeather } from "../../utiles/weatherapi";
import { useOutletContext } from "react-router-dom";
import CardSwiper from "../../component/CardSwiper";
import "swiper/css";
import "./index.scss";
const Home = () => {
  const [spin, setSpin] = useState(false);
  const [cities] = useOutletContext();
  console.log(cities);
  const { cookies } = useContext(ThemeContext);

  const [apiData, setApiData] = useState([]);

  const spinHandler = () => {
    console.log(cookies);
    if (!apiData.length) {
      //if  api Dta no exist
      if (!cookies) {
        //if not exist
        setSpin(false); //if has cookies
      } else {
        setSpin(true); //if no cookies
      }
    } else {
      setSpin(false);
    }
  };
  useEffect(() => {
    spinHandler();
    if (cities[0]) {
      getWeather(cities).then((res) => {
        setApiData(res);
        return true;
      });
    } else {
      setApiData([]);
    }
  }, [cities]);

  return (
    <>
      <div className="container">
        <Spin size="large" wrapperClassName="spin" spinning={spin} tip="Loading...">
          {" "}
        </Spin>
        <CardSwiper cardData={apiData}></CardSwiper>
      </div>
    </>
  );
};

export default Home;
