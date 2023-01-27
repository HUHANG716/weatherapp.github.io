import React from "react";
import Home from "../Home";
import { Button, Col, Layout as Frame, Menu, Row, Space, Switch, Typography } from "antd";
import "./index.scss";
import { useState } from "react";
import { useTheme } from "../../utiles/theme";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import Autocomplete from "../../component/Autocomplete";
export const ThemeContext = createContext();
const { Header, Footer, Content } = Frame;

const Layout = () => {
  const [cities, setCities] = useState(["London", "Beijing", "Sydney"]);
  const fn = (input) => {
    setCities([input].concat(cities));
  };
  const [curtTheme, setCurtTheme] = useState("dark");
  const theme = useTheme(curtTheme); //get a platte obj
  const { primary, secondary, tertiary, contrast } = theme;
  const switchHandler = () => {
    curtTheme === "dark" ? setCurtTheme("light") : setCurtTheme("dark");
  };

  return (
    <ThemeContext.Provider value={theme}>
      <Frame style={{ height: "100vh", backgroundColor: tertiary }}>
        <Header
          style={{ backgroundColor: primary, color: contrast }}
          className="header"
        >
          <Row style={{width:'100%'}} align="middle" justify='' >
           
      
         <Col   xs={0} sm={0} md={0} lg={6}>
              <Typography.Title

                style={{ textAlign:'center',margin: 0, color: contrast }}
                
                level={2}
              >
                Today
              </Typography.Title>
              
              </Col>
              <Col className="search-input" span={12} >
            <Autocomplete fn={fn} width="80%" focusWidth="100%"></Autocomplete>
            </Col>
            <Col xs={12}sm={12} md={12} lg={6}>
          <Space   size="small" className="switch">
            <Typography.Title style={{ margin: 0, color: contrast }} level={5}>
              Light
            </Typography.Title>
            <Switch
              style={{ color: contrast, backgroundColor: tertiary }}
              defaultChecked
              onChange={switchHandler}
            />
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
