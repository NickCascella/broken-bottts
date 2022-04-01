import { useEffect, useState } from "react";
import "./LevelStyler.scss";
import { v4 as uuid } from "uuid";
import { renderBotImg, getBotttStyles } from "../../utils/botCreation";

const LevelStyler = () => {
  const [placeholder, setPlaceHolder] = useState(null);
  const [styleOptions, setStyleOptions] = useState(null);
  const [targetBottt, setTargetBottt] = useState({
    dataUri: true,
    seed: uuid(),
    colors: [],
    colorful: true,
    textureChance: 50,
    rotate: 0,
    flip: false,
    primaryColorLevel: 600,
    secondaryColorLevel: 400,
  });
  const [generalBottt, setGeneralBottt] = useState({
    dataUri: true,
    seed: uuid(),
    colors: [],
    colorful: true,
    textureChance: 50,
    rotate: 0,
    flip: false,
    primaryColorLevel: 600,
    secondaryColorLevel: 400,
  });

  const [botttSvgs, setBotttSvgs] = useState([
    renderBotImg(targetBottt),
    renderBotImg(generalBottt),
  ]);

  useEffect(() => {
    const getStyles = async () => {
      let styles = await getBotttStyles();
      setStyleOptions(styles);
    };
    getStyles();
  }, [placeholder]);

  useEffect(() => {
    setBotttSvgs([renderBotImg(targetBottt), renderBotImg(generalBottt)]);
  }, [targetBottt]);

  const handleInput = (e, field, bottt, index) => {
    let targetValue = e.target.value;
    if (field === "seed") {
      return bottt === "target"
        ? setTargetBottt({ ...targetBottt, [field]: targetValue })
        : setGeneralBottt({ ...generalBottt, [field]: targetValue });
    } else if (field === "colors") {
      let colours = { ...targetBottt }.colors;
      colours[index] = targetValue;
      return bottt === "target"
        ? setTargetBottt({ ...targetBottt, [field]: colours })
        : setGeneralBottt({ ...generalBottt, [field]: colours });
    } else if (field === "colorful") {
      return bottt === "target"
        ? setTargetBottt({
            ...targetBottt,
            [field]: targetValue === "true" ? true : false,
          })
        : setGeneralBottt({
            ...generalBottt,
            [field]: targetValue === "true" ? true : false,
          });
    } else if (field === "textureChance") {
      return bottt === "target"
        ? setTargetBottt({
            ...targetBottt,
            [field]: targetValue,
          })
        : setGeneralBottt({
            ...generalBottt,
            [field]: targetValue,
          });
    } else if (field === "rotate") {
      return bottt === "target"
        ? setTargetBottt({
            ...targetBottt,
            [field]: targetValue,
          })
        : setGeneralBottt({
            ...generalBottt,
            [field]: targetValue,
          });
    } else if (field === "flip") {
      return bottt === "target"
        ? setTargetBottt({
            ...targetBottt,
            [field]: targetValue === "true" ? true : false,
          })
        : setGeneralBottt({
            ...generalBottt,
            [field]: targetValue === "true" ? true : false,
          });
    } else if (field === "primaryColorLevel") {
      return bottt === "target"
        ? setTargetBottt({
            ...targetBottt,
            [field]: targetValue,
          })
        : setGeneralBottt({
            ...generalBottt,
            [field]: targetValue,
          });
    } else if (field === "secondaryColorLevel") {
      return bottt === "target"
        ? setTargetBottt({
            ...targetBottt,
            [field]: targetValue,
          })
        : setGeneralBottt({
            ...generalBottt,
            [field]: targetValue,
          });
    } else if (field === "random") {
      let colourOne =
        styleOptions.colours[
          Math.floor(Math.random() * styleOptions.colours.length)
        ];
      let colourTwo =
        styleOptions.colours[
          Math.floor(Math.random() * styleOptions.colours.length)
        ];
      let colourLevelOne =
        styleOptions.primary_colour_levels[
          Math.floor(Math.random() * styleOptions.primary_colour_levels.length)
        ];
      let colourLevelTwo =
        styleOptions.secondary_colour_levels[
          Math.floor(
            Math.random() * styleOptions.secondary_colour_levels.length
          )
        ];
      const trueFalse = () =>
        Math.floor(Math.random() * 10) < 5 ? true : false;
      const rangeChance = () => Math.ceil(Math.random() * 100);

      let randomBottt = {
        dataUri: true,
        seed: uuid(),
        colors: [colourOne, colourTwo],
        colorful: true,
        textureChance: rangeChance(),
        rotate: 0,
        flip: trueFalse(),
        primaryColorLevel: colourLevelOne,
        secondaryColorLevel: colourLevelTwo,
      };
      return bottt === "target"
        ? setTargetBottt(randomBottt)
        : setGeneralBottt(randomBottt);
    }
  };

  return (
    <div className="level-styler">
      <section className="bottt-styling">
        <img
          className="bottt-styling__img-preview"
          alt="Robot"
          src={botttSvgs[0]}
        />
        <div>
          <label>Seed</label>
          <input
            type="text"
            onChange={(e) => handleInput(e, "seed", "target")}
            value={targetBottt.seed}
          />
          <button
            onClick={(e) => {
              handleInput(e, "random", "target");
            }}
          >
            Randomzie?
          </button>
        </div>
        <div>
          <h3>Colours?</h3>
          <label>Primary Colour</label>
          <select
            onChange={(e) => handleInput(e, "colors", "target", 0)}
            value={targetBottt.colors[0]}
          >
            {styleOptions &&
              styleOptions.colours.map((colour) => (
                <option key={uuid()} value={colour}>
                  {colour}
                </option>
              ))}
          </select>
          <label>Secondary Colour</label>
          <select
            onChange={(e) => handleInput(e, "colors", "target", 1)}
            value={targetBottt.colors[1]}
          >
            {styleOptions &&
              styleOptions.colours.map((colour) => (
                <option key={uuid()} value={colour}>
                  {colour}
                </option>
              ))}
          </select>
        </div>
        <div>
          <h3>Colour Levels</h3>
          <label>Primary</label>
          <select
            onChange={(e) => handleInput(e, "primaryColorLevel", "target")}
            value={targetBottt.primaryColorLevel}
          >
            {styleOptions &&
              styleOptions.primary_colour_levels.map((colour) => (
                <option key={uuid()} value={colour}>
                  {colour}
                </option>
              ))}
          </select>
          <label>Secondary</label>
          <select
            onChange={(e) => handleInput(e, "secondaryColorLevel", "target")}
            value={targetBottt.secondaryColorLevel}
          >
            {styleOptions &&
              styleOptions.secondary_colour_levels.map((colour) => (
                <option key={uuid()} value={colour}>
                  {colour}
                </option>
              ))}
          </select>
        </div>
        <div>
          <h3>Multi coloured?</h3>
          <label>Yes</label>
          <input
            defaultChecked={true}
            id="colorfulOne"
            type="radio"
            name="colorful"
            value={"true"}
            onChange={(e) => handleInput(e, "colorful", "target")}
          />
          <label>No</label>
          <input
            id="colorfulTwo"
            type="radio"
            name="colorful"
            value={"false"}
            onChange={(e) => handleInput(e, "colorful", "target")}
          />
        </div>
        <div>
          <label>Texture Chance</label>
          <input
            type={"range"}
            defaultValue={50}
            min={0}
            max={100}
            onChange={(e) => handleInput(e, "textureChance", "target")}
          />
        </div>
        <div>
          <label>Rotate</label>
          <input
            type={"range"}
            min={0}
            max={360}
            defaultValue={0}
            onChange={(e) => handleInput(e, "rotate", "target")}
          />
        </div>
        <div>
          <h3>Flip?</h3>
          <label>Yes</label>
          <input
            id="flipOne"
            type="radio"
            name="flip"
            value={"true"}
            onChange={(e) => handleInput(e, "flip", "target")}
          />
          <label>No</label>
          <input
            defaultChecked={true}
            id="flipTwo"
            type="radio"
            name="flip"
            value={"false"}
            onChange={(e) => handleInput(e, "flip", "target")}
          />
        </div>
      </section>
      <section className="bottt-styling">
        <img
          className="bottt-styling__img-preview"
          alt="Robot"
          src={botttSvgs[1]}
        />
      </section>
    </div>
  );
};

export default LevelStyler;
