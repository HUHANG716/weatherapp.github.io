import React from "react";
import Home from "../Home";
import { Button, Layout as Frame, Menu, Space, Switch, Typography } from "antd";
import "./index.scss";
import { useState } from "react";
import { useTheme } from "../../utiles/theme";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
export const ThemeContext = createContext();
const { Header, Footer, Content } = Frame;

const Layout = () => {
  const [curtTheme, setCurtTheme] = useState("dark");
  const theme=useTheme(curtTheme)//get a platte obj
  const { primary, secondary, tertiary, contrast } =theme;
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
          <Space size="large">
            <Button style={{color:contrast,backgroundColor:primary}} size="large">
              <i className="fa-solid fa-bars"></i>
            </Button>
            <i className="fa-solid fa-cloud"></i>
          </Space>
          <Typography.Title
            style={{ margin: 0, color: contrast }}
            className="switch-text"
            level={2}
          >
            Today
          </Typography.Title>
          <Space size="large" align="center" className="switch">
            <Typography.Title style={{ margin: 0, color: contrast }} level={4}>
              Light
            </Typography.Title>
            <Switch style={{color:contrast,backgroundColor:tertiary}} defaultChecked onChange={switchHandler} />
            <Typography.Title style={{ margin: 0, color: contrast }} level={4}>
              Dark
            </Typography.Title>
          </Space>
        </Header>
        <Content>
          <Outlet></Outlet>
        </Content>
        
      </Frame>
    </ThemeContext.Provider>
  );
};

export default Layout;
