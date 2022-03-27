import "./Slider.scss";

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
          <div className={slideClass}>
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
