import "./Slider.scss";
import { v4 as uuid } from "uuid";

const Slider = ({
  sliderClass,
  trackClass,
  slideClass,
  imgClass,
  setSelectedChoice,
  displayedImgs,
}) => {
  return (
    <div className={sliderClass}>
      <div className={trackClass}>
        {displayedImgs.map((src) => (
          <div key={uuid()} className={slideClass}>
            <img
              src={src}
              onClick={(e) => {
                setSelectedChoice(e.target.src);
              }}
              className={imgClass}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
