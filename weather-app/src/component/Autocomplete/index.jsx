import { Select, message } from "antd";
import React from "react";
import { useState } from "react";
import { getCities } from "../../utiles/weatherapi";
import { useTheme } from "../../utiles/theme";
import "./index.scss";
function Autocomplete({ fn, width, focusWidth }) {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);

  const [curwidth, setWidth] = useState(width);
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
      dropdownMatchSelectWidth
      allowClear
      suffixIcon={<i style={{}} className="fa-solid fa-magnifying-glass"></i>}
      onFocus={() => setWidth(focusWidth)}
      onBlur={() => setWidth(width)}
      className="select"
      showSearch
      size="large"
      value={value}
      placeholder="Search for a city here!"
      style={{ width: curwidth }}
      defaultActiveFirstOption={false}
      showArrow={true}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
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
