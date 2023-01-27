import {
  Button,
  Card,
  Col,
  Drawer,
  Row,
  Space,
  Typography,
  message,
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
   
    getWeather(cities).then((res) => {
      setApiData(res);
      return true;
    });
  }, [cities]);

  const prev = (e) => {
    if (index !== 0) {
      left += 33.3;
      index = index - 1;

      console.log(temp);
      setTemp(index);
      useDom.current.style.left = left + "%";
    } else {
    }
    console.log(useDom.current.style.left);
  };
  const next = () => {
    if (index !== cities.length) {
      index = index + 1;
      left -= 33.3;
      useDom.current.style.left = left + "%";
      setTemp(index);
      console.log(useDom.current.style.left);
      
      
    }
  };

  return (
    <>
    
            <CardSwiper></CardSwiper>
          
      <div className="container">
          
        <Button
          disabled={temp === 0}
          style={{ color: contrast }}
          onClick={() => prev()}
          className="prevent"
          type="text"
        >
          <i className="fa-solid fa-caret-left"></i>
        </Button>
       
          <div ref={useDom} className="cards">
            
            {apiData.map(({ current, location, forecast }, index) => {
              const { maxtemp_c, mintemp_c } = forecast.forecastday[0].day;
              return (
              
                  <Card

                    style={{ backgroundColor: secondary }}
                    className="card"
                    hoverable
                    title={location.name}
                    bodyStyle={{
                      width: "100%",

                      backgroundColor: secondary,
                      color: contrast,
                    }}
                    headStyle={{
                      width: "100%",
                      backgroundColor: secondary,
                      color: contrast,
                    }}
                    cover={
                      <div style={{ width: "100%" }}>
                        <img
                          style={{ height: "128px", width: "128px" }}
                          alt="example"
                          src={current.condition.icon}
                        />
                        <div className="info-container">
                          <Typography.Title
                            style={{ margin: 0, color: contrast }}
                          >
                            {current.temp_c}°C
                          </Typography.Title>

                          <Typography.Title
                            level={5}
                            style={{ margin: 0, color: contrast }}
                          >
                            {current.condition.text}
                          </Typography.Title>
                        </div>
                      </div>
                    }
                  >
                    <div className="card-footer">
                      <Space.Compact direction="vertical">
                        <i
                          style={{ color: "#597ef7" }}
                          className="fa-sharp fa-solid fa-caret-down"
                        ></i>
                        <Typography.Text
                          strong
                          style={{ margin: 0, color: contrast }}
                        >
                          {mintemp_c}°C
                        </Typography.Text>
                        <Typography.Text
                          strong
                          style={{ margin: 0, color: "#597ef7" }}
                        >
                          Min
                        </Typography.Text>
                      </Space.Compact>
                      <Space.Compact direction="vertical">
                        <i
                          style={{ color: "#ff4d4f" }}
                          className="up fa-sharp fa-solid fa-caret-up"
                        ></i>{" "}
                        <Typography.Text
                          strong
                          style={{ margin: 0, color: contrast }}
                        >
                          {maxtemp_c}°C
                        </Typography.Text>
                        <Typography.Text
                          strong
                          style={{ margin: 0, color: "#ff4d4f" }}
                        >
                          Max
                        </Typography.Text>
                      </Space.Compact>
                    </div>
                  </Card>
              
              );
            })}
          </div>
       
        <Button
          disabled={temp === cities.length}
          style={{ color: contrast }}
          onClick={next}
          type="text"
        >
          <i className="fa-solid fa-caret-right"></i>
        </Button>
      </div>
    </>
  );
};

export default Home;
