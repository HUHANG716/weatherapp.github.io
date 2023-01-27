import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Card, Space, Typography } from "antd";
import { ThemeContext } from "../../pages/Layout";
import "./index.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const CardSwiper = ({ cardData }) => {
  const { contrast, tertiary, secondary, primary } = useContext(ThemeContext);
  
  return (
    <>
      <Swiper
        navigation={true}
        slidesPerView={1}
        spaceBetween={0}
       
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {cardData.map(({ current, location, forecast }, index) => {
          const { maxtemp_c, mintemp_c } = forecast.forecastday[0].day;
          return (
            <SwiperSlide key={index}>
          
              <Card
                style={{ background: secondary }}
                className="card"
                hoverable
                title={location.name}
                bodyStyle={{
                  width: "100%",

                  background: secondary,
                  color: contrast,
                }}
                headStyle={{
                  width: "100%",
                  background: secondary,
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
                      <Typography.Title style={{ margin: 0, color: contrast }}>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CardSwiper;
