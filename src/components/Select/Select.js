import * as React from "react";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { startCase } from "lodash";
import { v4 as uuid } from "uuid";

const CustomSelect = ({ handleChange, label, options, value, bottt }) => {
  return (
    <FormControl fullWidth>
      <InputLabel
        shrink
        id={`demo-label`}
        sx={{
          color: () => (bottt === "target" ? "info.main" : "divider.main"),
          marginTop: "1rem",
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`demo-label`}
        value={value}
        id={"demo"}
        label={label}
        onChange={handleChange}
        MenuProps={{
          MenuListProps: { sx: { padding: 0 } },
        }}
        IconComponent={ArrowDropDownCircleOutlinedIcon}
        sx={{
          color: "primary.main",
          height: "80%",
          marginTop: "1rem",
          background: "background.default",
          "& .MuiSelect-icon": {
            color: "primary.main",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={uuid()}
            value={option}
            sx={(theme) => ({
              color: "primary.main",
              background: theme.palette.background.default,
              borderLeft: 1,
              borderRight: 1,
              "&:nth-of-type(1)": {
                borderTop: 1,
              },
              "&:last-child": {
                borderBottom: 1,
              },
              "&.Mui-selected": {
                backgroundColor: theme.palette.secondary.light,
              },
            })}
          >
            {startCase(option)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
