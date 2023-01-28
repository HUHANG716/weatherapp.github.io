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
  const [cities, title] = useOutletContext();

  const { cookies } = useContext(ThemeContext);

  const [apiData, setApiData] = useState([]);

  const spinHandler = () => {
    !apiData.length || (cities[0] && setSpin(true));
  };
  useEffect(() => {
    spinHandler();
    if (cities[0]) {
      setSpin(true);
      getWeather(cities).then((res) => {
        setApiData(res);
        setSpin(false);
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
        <CardSwiper cities={cities} title={title} cardData={apiData}></CardSwiper>
      </div>
    </>
  );
};

export default Home;
