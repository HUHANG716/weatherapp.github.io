import {
  Button,
  Card,
  Col,
  Drawer,
  Row,
  Space,
  Typography,
  message,
  Spin,
} from "antd";
import React, { useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
import { useRef } from "react";
import "./index.scss";
import { useState } from "react";
import { getWeather } from "../../utiles/weatherapi";
import { createContext } from "react";
import { useOutletContext } from "react-router-dom";
import CardSwiper from "../../component/CardSwiper";
import 'swiper/css';
let index = 0;
let left = 0;

const Home = () => {
  const [cities] = useOutletContext();
  console.log(cities);
  const { contrast, tertiary, secondary, primary } = useContext(ThemeContext);
  const useDom = useRef(null);
  const [temp, setTemp] = useState(0);
  const [apiData, setApiData] = useState([]);
    const card=useRef(null)
   
  useEffect(() => {
   console.log(Boolean(apiData.length));
   console.log(cities,"123456");
    getWeather(cities).then((res) => {
      setApiData(res);
      return true;
    });
  }, [cities]);


  return (
    <>
    
            
   
      <div className="container">
             <Spin size="large" wrapperClassName="spin" spinning={!apiData.length} tip='Loading...' >  </Spin>
            <CardSwiper cardData={apiData} ></CardSwiper>
          
      </div>
     
    </>
  );
};

export default Home;
