import { Select, message, Spin } from "antd";
import React from "react";
import { useState } from "react";
import { getCities } from "../../utiles/weatherapi";
import "./index.scss";
let temp = [];
function Autocomplete({ onAddStorage, width, focusWidth }) {
  const [value, setValue] = useState();
  const [data, setData] = useState([]);

  const [result, setResult] = useState(null);
  const handleSearch = (newValue) => {
    console.log(newValue, "newValue");
    if (newValue) {
      if (newValue.length > 2 && newValue !== undefined) {
        setResult(<Spin></Spin>);
        getCities(newValue).then((res) => {
          res.data && setData(res.data);
          res.data.length === 0 && setResult(<h3>Not Found</h3>);
          temp = res.data;

          return true;
        });
      } else {
        setResult(<h3>Not Found</h3>);
        setData([]);
      }
    } else {
      setResult(null);
    }
  };

  const handleChange = (newValue) => {
    if (newValue !== undefined && newValue.length > 2) {
      console.log(newValue, "newValue");
      onAddStorage(newValue);
    }

    setValue("");

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
      notFoundContent={result}
      autoFocus
      allowClear
      suffixIcon={<i style={{}} className="fa-solid fa-magnifying-glass"></i>}
      className="select"
      showSearch
      size="large"
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
          value: name + "",
          label: name + (region && ", " + region) + ", " + country,
        };
      })}
    />
  );
}

export default Autocomplete;
