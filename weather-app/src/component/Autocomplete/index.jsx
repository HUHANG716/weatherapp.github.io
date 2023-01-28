import { Select, message, Spin } from "antd";
import React from "react";
import { useState } from "react";
import { getCities } from "../../utiles/weatherapi";
import { useTheme } from "../../utiles/theme";
import "./index.scss";
function Autocomplete({ fn, width, focusWidth }) {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);
  const [size, setSize] = useState("middle");
  const handleSearch = (newValue) => {
    if (newValue) {
      if (newValue.length > 2 && newValue !== undefined) {
        console.log("carry");
        getCities(newValue).then((res) => {
          setData(res.data.slice(0, 10));

          return true;
        });
      }
    } else {
      setData([]);
    }
  };
  const handleNoContent = () => {
    if (value?.length > 2) {
      if (data !== []) {
        return "Loading...";
      } else {
        return "Not Found";
      }
    } else {
      return null;
    }
  };
  const handleChange = (newValue) => {
    if (newValue !== undefined && newValue.length > 2) {
      fn(newValue);
    }
    console.log(newValue);
    setValue(newValue);

    newValue &&
      message.success({
        className: "message-info",
        content: newValue + " is added successfully!",
      });
  };
  return (
    <Select
      dropdownStyle={{ fontWeight: "bold" }}
      popupClassName="menu"
      dropdownMatchSelectWidth={false}
      autoFocus
      allowClear
      suffixIcon={<i style={{}} className="fa-solid fa-magnifying-glass"></i>}
      className="select"
      showSearch
      size={size}
      value={value}
      placeholder="Search for a city here."
      style={{ width: focusWidth }}
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      options={(data || []).map(({ country, region, name }) => {
        return {
          value: name,
          label: name + (region && ", " + region) + ", " + country,
        };
      })}
    />
  );
}

export default Autocomplete;
