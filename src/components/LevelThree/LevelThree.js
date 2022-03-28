import "./LevelThree.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const LevelThree = ({
  levelData,
  setSelectedChoice,
  levelsCompleted,
  previousComplete,
}) => {
  const [splitArray, setSplitArray] = useState([]);

  useEffect(() => {
    let levelDataCopy = [...levelData];
    let setOneA = levelDataCopy.splice(0, 6);
    let setOneB = [...setOneA];
    const setOne = setOneA.concat(setOneB);
    let setTwoA = levelDataCopy.splice(0, 6);
    let setTwoB = [...setTwoA];
    const setTwo = setTwoA.concat(setTwoB);
    let setThreeA = levelDataCopy.splice(0, 6);
    let setThreeB = [...setThreeA];
    const setThree = setThreeA.concat(setThreeB);
    let setFourA = levelDataCopy.splice(0, 6);
    let setFourB = [...setFourA];
    const setFour = setFourA.concat(setFourB);
    let setFiveA = levelDataCopy.splice(0, 6);
    let setFiveB = [...setFiveA];
    const setFive = setFiveA.concat(setFiveB);
    let setSixA = levelDataCopy.splice(0, 6);
    let setSixB = [...setSixA];
    const setSix = setSixA.concat(setSixB);
    let setSevenA = levelDataCopy.splice(0, 6);
    let setSevenB = [...setSevenA];
    const setSeven = setSevenA.concat(setSevenB);
    let newArraySet = [
      setOne,
      setTwo,
      setThree,
      setFour,
      setFive,
      setSix,
      setSeven,
    ];
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section
      className={`level-three ${
        levelsCompleted === 2 && "level-three--starting"
      } ${levelsCompleted === 3 && "level-three--completed"}`}
    >
      <Slider
        sliderClass={"level-three__slider"}
        trackClass={"level-three__slide-track level-three__slide-track--left"}
        slideClass={"level-three__slide"}
        imgClass={"level-three__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[0]}
      />
      <Slider
        sliderClass={"level-three__slider"}
        trackClass={"level-three__slide-track"}
        slideClass={"level-three__slide"}
        imgClass={"level-three__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[1]}
      />
      <Slider
        sliderClass={"level-three__slider"}
        trackClass={"level-three__slide-track level-three__slide-track--left"}
        slideClass={"level-three__slide"}
        imgClass={"level-three__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[2]}
      />
      <Slider
        sliderClass={"level-three__slider"}
        trackClass={"level-three__slide-track"}
        slideClass={"level-three__slide"}
        imgClass={"level-three__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[3]}
      />
      <Slider
        sliderClass={"level-three__slider"}
        trackClass={"level-three__slide-track level-three__slide-track--left"}
        slideClass={"level-three__slide"}
        imgClass={"level-three__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[4]}
      />
      <Slider
        sliderClass={"level-three__slider"}
        trackClass={"level-three__slide-track"}
        slideClass={"level-three__slide"}
        imgClass={"level-three__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[5]}
      />
      <Slider
        sliderClass={"level-three__slider"}
        trackClass={"level-three__slide-track level-three__slide-track--left"}
        slideClass={"level-three__slide"}
        imgClass={"level-three__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[6]}
      />
    </section>
  );
};

export default LevelThree;
