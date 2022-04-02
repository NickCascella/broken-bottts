import { Slider } from "@mui/material";

const RangeSlider = ({ value, handleChange, min, max }) => {
  return (
    <>
      <Slider
        size={"small"}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        sx={{
          "& .MuiSlider-thumb": {
            background: "yellow",
          },
        }}
      />
    </>
  );
};

export default RangeSlider;
