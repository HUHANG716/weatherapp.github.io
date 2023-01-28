import React from "react";
import { Col, Layout as Frame, Menu, Row, Space, Spin, Switch, Typography } from "antd";
import "./index.scss";
import { useState } from "react";
import { useTheme } from "../../utiles/theme";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import Autocomplete from "../../component/Autocomplete";
import { useEffect } from "react";
export const ThemeContext = createContext();
const { Header, Content } = Frame;

const Layout = () => {
  const [cities, setCities] = useState([]);
  const [cookies, setCookies] = useState([]);

  useEffect(() => {
    setCookies(window.localStorage.getItem("saved"));
    if (window.localStorage.getItem("saved") !== null) {
      setCities(window.localStorage.getItem("saved").split(","));
    } else {
      setCities(["London", "Beijing", "Sydney", "Tokyo", "Paris"]);
    }
  }, []);
  const deleteCard = (card) => {
    console.log(card, "123");
    console.log(cities, "cities");
    const newCardsGroup = cities.filter((item) => item !== card);
    console.log(newCardsGroup, 456);
    setCities(newCardsGroup);
    window.localStorage.setItem("saved", newCardsGroup);
  };
  const onAddStorage = (input) => {
    console.log(input);
    window.localStorage.setItem("saved", [input].concat(cities));

    setCities([input].concat(cities));
  };
  const [curtTheme, setCurtTheme] = useState("dark");
  const theme = useTheme(curtTheme); //get a platte obj
  const { primary, tertiary, contrast } = theme;
  const switchHandler = () => {
    curtTheme === "dark" ? setCurtTheme("light") : setCurtTheme("dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, deleteCard, cookies }}>
      <Frame className="bg" style={{ background: tertiary, height: "100vh" }}>
        <Header style={{ background: primary, color: contrast }} className="header">
          <Row style={{ width: "100%" }} align="middle" justify="">
            <Col xs={0} sm={0} md={0} lg={6}>
              <Typography.Title style={{ textAlign: "center", margin: 0, color: contrast }} level={2}>
                Today
              </Typography.Title>
            </Col>
            <Col className="search-input" span={12}>
              <Autocomplete onAddStorage={onAddStorage} width="80%" focusWidth="100%"></Autocomplete>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6}>
              <Space size="small" className="switch">
                <Typography.Title style={{ margin: 0, color: contrast }} level={5}>
                  Light
                </Typography.Title>
                <Switch style={{ color: contrast, background: tertiary }} defaultChecked onChange={switchHandler} />
                <Typography.Title style={{ margin: 0, color: contrast }} level={5}>
                  Dark
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content>
          <Outlet context={[cities]}></Outlet>
        </Content>
      </Frame>
    </ThemeContext.Provider>
  );
};

export default Layout;
