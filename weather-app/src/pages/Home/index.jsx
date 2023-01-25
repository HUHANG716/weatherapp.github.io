import { Button, Card, Col, Row, Space, Typography } from "antd";
import React, { useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../Layout";
import { useRef } from "react";
import "./index.scss";
import { useState } from "react";
import { getWeather } from "../../utiles/weather";
const Home = () => {
  const { contrast, tertiary, secondary, primary } = useContext(ThemeContext);
  const useDom = useRef(null);
  let left = 0;
  const [temp,setTemp]=useState(0)
  const [apiData, setApiData] = useState([]);
  const [cities, setcities] = useState([
    "London",
    "Beijing",
    "Sydney",
    "Sydney",
    "Sydney",
    "Sydney",
  ]);
  let index = 0;
  useEffect(() => {
    getWeather(cities).then((res) => {
      setApiData(res);
      return true;
    });
    useDom.current.style.left='0%'
  }, [cities,temp]);

  const prev = (e) => {
  
    if (index !== 0) {
      
      left += 33.3;
      index = index - 1;
      setTemp(index-1)
      console.log(temp);
      useDom.current.style.left = left + "%";
     
    } else {
        
     
    }
    console.log(useDom.current.style.left);
  };
  const next = () => {
    if (index !== cities.length - 2) {
      index = index + 1;
      left -= 33.3;
      useDom.current.style.left = left + "%";
      setTemp(index+1)
      console.log(useDom.current.style.left);
    }
  };

  return (
    <>
      <div className="container">
        <Button
         
          style={{ color: contrast }}
          onClick={(e) => prev(e)}
          className="prevent"
          type="text"
        >
          <i className="fa-solid fa-caret-left"></i>
        </Button>
        <Row gutter={24} className="card-container">
          <div ref={useDom} className="cards">
            {apiData.map(({ current, location, forecast }, index) => {
              const { maxtemp_c, mintemp_c } = forecast.forecastday[0].day;
              return (
                <Col key={index} span={8}>
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
                      <img
                        style={{ height: "128px" }}
                        alt="example"
                        src={current.condition.icon}
                      />
                    }
                  >
                    <Typography.Title style={{ margin: 0, color: contrast }}>
                      {current.temp_c}°C
                    </Typography.Title>

                    <Typography.Title
                      style={{ margin: 0, color: contrast }}
                      level={3}
                    >
                      {current.condition.text}
                    </Typography.Title>
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
                </Col>
              );
            })}
          </div>
        </Row>
        <Button style={{ color: contrast }} onClick={next} type="text">
          <i className="fa-solid fa-caret-right"></i>
        </Button>
      </div>
    </>
  );
};

export default Home;
