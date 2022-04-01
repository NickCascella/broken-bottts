import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";

const CustomSelect = ({ handleChange, label, options }) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        id="demo-simple-select-label"
        sx={{
          color: "#ffb101",
          marginTop: "1rem",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        onChange={handleChange}
        MenuProps={{
          MenuListProps: { sx: { padding: 0 } },
        }}
        sx={{
          color: "primary.main",

          height: "80%",
          marginTop: "1rem",
          background: "secondary.main",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={uuid()}
            value={option}
            sx={{
              color: "primary.main",
              background: "#000",
              borderLeft: 1,
              borderRight: 1,
              "&:nth-child(1)": {
                borderTop: 1,
              },
              "&:last-child": {
                borderBottom: 1,
              },
              "&.Mui-selected": {
                backgroundColor: "secondary.two",
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
