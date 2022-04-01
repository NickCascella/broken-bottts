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
      />
    </>
  );
};

// const RangeSlider = styled(Slider)({
//   "& .MuiSlider-thumb": {
//     background: `url(${scrub})`,
//     backgroundPosition: "center",
//     backgroundSize: "cover",
//     width: "1.1rem",
//     height: "1.1rem",
//     transition: "none",
//     "@media (min-width: 768px)": {
//       width: "0.75rem",
//       height: "0.75rem",
//     },
//   },
//   "& .MuiSlider-track": {
//     transition: "none",
//     height: "0.15rem",
//     width: "0.15rem",
//   },
//   "& .MuiSlider-rail": {
//     backgroundColor: "#e1e1e1",
//   },
// });

export default RangeSlider;
