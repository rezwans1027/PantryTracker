import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const Sort = ({ update }) => {

  const [sortValue, setSortValue] = React.useState("");

  const handleChange = async (event) => {
    setSortValue(event.target.value);
    console.log(event.target.value);
    await update();
  };

  return (
    <div className="w-96 mt-8 flex justify-end">
      <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortValue}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value={"az"}>A-Z</MenuItem>
            <MenuItem value={"za"}>Z-A</MenuItem>
            <MenuItem value={"highest"}>Highest Quantity</MenuItem>
            <MenuItem value={"lowest"}>Lowest Quantity</MenuItem>
            <MenuItem value={"recent"}>Recently Added</MenuItem>
            <MenuItem value={"early"}>Earliest Added</MenuItem>
          </Select>
        </FormControl>
       
      </div>
    </div>
  );
};

export default Sort;
