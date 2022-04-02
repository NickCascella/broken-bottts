import { useEffect, useState } from "react";
import "./LevelStyler.scss";
import { v4 as uuid } from "uuid";
import { renderBotImg, getBotttStyles } from "../../utils/botCreation";
import CustomSelect from "../Select/Select";
import RangeSlider from "../RangeSlider/RangeSlider";
import RadioInput from "../Radio/Radio";
import Button from "../Button/Button";
import TextArea from "../TextInput/TextArea";

const LevelStyler = ({
  setSeedFormatting,
  seedFormatting,
  level,
  currentLevelView,
}) => {
  const [placeholder, setPlaceHolder] = useState(null);
  const [styleOptions, setStyleOptions] = useState(null);
  const [differences, setDifferences] = useState("Exact");
  const [targetBottt, setTargetBottt] = useState({
    dataUri: true,
    seed: uuid(),
    colors: ["blue", "yellow"],
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
    colors: ["blue", "yellow"],
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
    setSeedFormatting({
      ...seedFormatting,
      [level]: {
        targetBotttObjInfo: targetBottt,
        allBotttsObjInfo: generalBottt,
        generalBotttDifferences: differences,
      },
    });
  }, [targetBottt, generalBottt, differences]);

  const handleInput = (e, field, bottt, index) => {
    let targetValue = e.target.value;
    if (field === "seed") {
      return bottt === "target"
        ? setTargetBottt({ ...targetBottt, [field]: targetValue })
        : setGeneralBottt({ ...generalBottt, [field]: targetValue });
    } else if (field === "colors") {
      let colours = { ...targetBottt }.colors;
      if (bottt !== "target") {
        colours = { ...generalBottt }.colors;
      }

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
    } else if (field === "difference") {
      setDifferences(targetValue);
    }
  };

  return (
    <div
      className={`level-styler ${
        currentLevelView !== level && "level-styler--hidden"
      }`}
    >
      <section className="bottt-styling">
        <div className="bottt-styling__grouped-inputs">
          <div className="bottt-styling__img-random-btn">
            <img
              className="bottt-styling__img-preview"
              alt="Robot"
              src={botttSvgs[0]}
            />

            <Button
              handleInput={(e) => {
                handleInput(e, "random", "target");
              }}
              text={"Randomize"}
            />
          </div>
          <h2 className="bottt-styling__bottt-title">Target Bottt</h2>
          <div className="bottt-styling__input-label-pairing">
            <label className="bottt-styling__label">Serial #</label>
            <TextArea
              handleInput={(e) => handleInput(e, "seed", "target")}
              value={targetBottt.seed}
            />
          </div>
        </div>
        <div className="bottt-styling__grouped-inputs bottt-styling__grouped-inputs--drop-downs">
          {styleOptions && (
            <CustomSelect
              label={"Primary Colour"}
              value={targetBottt.colors[0]}
              handleChange={(e) => handleInput(e, "colors", "target", 0)}
              options={styleOptions.colours}
              bottt="target"
            />
          )}
          {styleOptions && (
            <CustomSelect
              label={"Primary Colour Level"}
              value={targetBottt.primaryColorLevel}
              handleChange={(e) =>
                handleInput(e, "primaryColorLevel", "target")
              }
              options={styleOptions.primary_colour_levels}
              bottt="target"
            />
          )}
          {styleOptions && (
            <CustomSelect
              label={"Secondary Colour"}
              value={targetBottt.colors[1]}
              handleChange={(e) => handleInput(e, "colors", "target", 1)}
              options={styleOptions.colours}
              bottt="target"
            />
          )}
          {styleOptions && (
            <CustomSelect
              value={targetBottt.secondaryColorLevel}
              label={"Secondary Colour Level"}
              handleChange={(e) =>
                handleInput(e, "secondaryColorLevel", "target")
              }
              options={styleOptions.secondary_colour_levels}
              bottt="target"
            />
          )}
        </div>
        <div className="bottt-styling__grouped-inputs bottt-styling__grouped-inputs--sliders-radio">
          <div>
            <h3 className="bottt-styling__label">Dual colours?</h3>
            <label htmlFor={"colorfulOne"}>Yes</label>
            <RadioInput
              defaultChecked={true}
              id={`${level}colorfulOne`}
              name={`${level}colorful`}
              value={true}
              handleInput={(e) => handleInput(e, "colorful", "target")}
            />

            <label htmlFor={"colorfulTwo"}>No</label>
            <RadioInput
              id={`${level}colorfulTwo`}
              name={`${level}colorful`}
              value={false}
              handleInput={(e) => handleInput(e, "colorful", "target")}
            />
            <h3 className="bottt-styling__label">Flip?</h3>
            <label htmlFor={`${level}flipOne`}>Yes</label>
            <RadioInput
              id={`${level}flipOne`}
              name={`${level}flip`}
              value={true}
              handleInput={(e) => handleInput(e, "flip", "target")}
            />

            <label htmlFor={`${level}flipTwo`}>No</label>
            <RadioInput
              id={`${level}flipTwo`}
              name={`${level}flip`}
              value={false}
              handleInput={(e) => handleInput(e, "flip", "target")}
              defaultChecked={true}
            />
            <h3 className="bottt-styling__label">Texture Chance</h3>
            <RangeSlider
              value={targetBottt.textureChance}
              min={0}
              max={100}
              handleChange={(e) => handleInput(e, "textureChance", "target")}
              defaultValue={50}
            />
            <h3 className="bottt-styling__label">Rotation</h3>
            <RangeSlider
              label={"Rotation"}
              value={targetBottt.rotate}
              min={0}
              max={360}
              handleChange={(e) => handleInput(e, "rotate", "target")}
            />
          </div>
        </div>
      </section>
      <section className="bottt-styling bottt-styling--general">
        <div className="bottt-styling__grouped-inputs">
          <div className="bottt-styling__img-random-btn">
            <img
              className="bottt-styling__img-preview"
              alt="Robot"
              src={botttSvgs[1]}
            />

            <Button
              handleInput={(e) => {
                handleInput(e, "random", "general");
              }}
              text={"Randomize"}
            />
          </div>
          <h2 className="bottt-styling__bottt-title">General Bottt</h2>
          <div className="bottt-styling__input-label-pairing">
            <label className="bottt-styling__label">Serial #</label>
            <TextArea
              handleInput={(e) => handleInput(e, "seed", "general")}
              value={generalBottt.seed}
            />
          </div>
        </div>
        <div className="bottt-styling__grouped-inputs bottt-styling__grouped-inputs--drop-downs">
          {styleOptions && (
            <CustomSelect
              value={generalBottt.colors[0]}
              label={"Primary Colour"}
              handleChange={(e) => handleInput(e, "colors", "general", 0)}
              options={styleOptions.colours}
              bottt="general"
            />
          )}
          {styleOptions && (
            <CustomSelect
              value={generalBottt.primaryColorLevel}
              label={"Primary Colour Level"}
              handleChange={(e) =>
                handleInput(e, "primaryColorLevel", "general")
              }
              options={styleOptions.primary_colour_levels}
              bottt="general"
            />
          )}
          {styleOptions && (
            <CustomSelect
              value={generalBottt.colors[1]}
              label={"Secondary Colour"}
              handleChange={(e) => handleInput(e, "colors", "general", 1)}
              options={styleOptions.colours}
              bottt="general"
            />
          )}
          {styleOptions && (
            <CustomSelect
              value={generalBottt.secondaryColorLevel}
              label={"Secondary Colour Level"}
              handleChange={(e) =>
                handleInput(e, "secondaryColorLevel", "general")
              }
              options={styleOptions.secondary_colour_levels}
              bottt="general"
            />
          )}
        </div>
        <div className="bottt-styling__grouped-inputs bottt-styling__grouped-inputs--sliders-radio">
          <div>
            <h3 className="bottt-styling__label">Dual colours?</h3>
            <label htmlFor={"colorfulThree"}>Yes</label>
            <RadioInput
              defaultChecked={true}
              id={`${level}colorfulThree`}
              name={`${level}colorfulTwo`}
              value={true}
              handleInput={(e) => handleInput(e, "colorful", "general")}
            />

            <label htmlFor={"colorfulFour"}>No</label>
            <RadioInput
              id={`${level}colorfulFour`}
              name={`${level}colorfulTwo`}
              value={false}
              handleInput={(e) => handleInput(e, "colorful", "general")}
            />
            <h3 className="bottt-styling__label">Flip?</h3>
            <label htmlFor={`${level}flipThree`}>Yes</label>
            <RadioInput
              id={`${level}flipThree`}
              name={`${level}flipTwo`}
              value={true}
              handleInput={(e) => handleInput(e, "flip", "general")}
            />

            <label htmlFor={`${level}flipFour`}>No</label>
            <RadioInput
              id={`${level}flipFour`}
              name={`${level}flipTwo`}
              value={false}
              handleInput={(e) => handleInput(e, "flip", "general")}
              defaultChecked={true}
            />
            <h3 className="bottt-styling__label">Texture Chance</h3>
            <RangeSlider
              value={generalBottt.textureChance}
              min={0}
              max={100}
              handleChange={(e) => handleInput(e, "textureChance", "general")}
              defaultValue={50}
            />
            <h3 className="bottt-styling__label">Rotation</h3>
            <RangeSlider
              label={"Rotation"}
              value={generalBottt.rotate}
              min={0}
              max={360}
              handleChange={(e) => handleInput(e, "rotate", "general")}
            />

            <label htmlFor={`${level}differencesOne`}>E</label>
            <RadioInput
              defaultChecked={true}
              id={`${level}differencesOne`}
              name={`${level}differences`}
              value={"Exact"}
              handleInput={(e) => handleInput(e, "difference", "general")}
            />

            <label htmlFor={`${level}differencesTwo`}>S</label>
            <RadioInput
              id={`${level}differencesTwo`}
              name={`${level}differences`}
              value={"Similar"}
              handleInput={(e) => handleInput(e, "difference", "general")}
            />
            <label htmlFor={`${level}differencesThree`}>D</label>
            <RadioInput
              id={`${level}differencesThree`}
              name={`${level}differences`}
              value={"Different"}
              handleInput={(e) => handleInput(e, "difference", "general")}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LevelStyler;
