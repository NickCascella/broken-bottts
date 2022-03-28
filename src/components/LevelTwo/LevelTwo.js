import "./LevelTwo.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const LevelTwo = ({
  levelData,
  setSelectedChoice,
  levelsCompleted,
  previousComplete,
}) => {
  const [splitArray, setSplitArray] = useState([]);

  useEffect(() => {
    let levelDataCopy = [...levelData];
    let setOneA = levelDataCopy.splice(0, 5);
    let setOneB = [...setOneA];
    const setOne = setOneA.concat(setOneB);
    let setTwoA = levelDataCopy.splice(0, 5);
    let setTwoB = [...setTwoA];
    const setTwo = setTwoA.concat(setTwoB);
    let setThreeA = levelDataCopy.splice(0, 5);
    let setThreeB = [...setThreeA];
    const setThree = setThreeA.concat(setThreeB);
    let setFourA = levelDataCopy.splice(0, 5);
    let setFourB = [...setFourA];
    const setFour = setFourA.concat(setFourB);
    let setFiveA = levelDataCopy.splice(0, 5);
    let setFiveB = [...setFiveA];
    const setFive = setFiveA.concat(setFiveB);
    let newArraySet = [setOne, setTwo, setThree, setFour, setFive];
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section
      className={`level-two ${levelsCompleted === 1 && "level-two--starting"} ${
        levelsCompleted === 2 && "level-two--completed"
      } ${previousComplete && "level-two--prev-completed"}`}
    >
      <Slider
        sliderClass={"level-two__slider"}
        trackClass={"level-two__slide-track"}
        slideClass={"level-two__slide"}
        imgClass={"level-two__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[0]}
      />
      <Slider
        sliderClass={"level-two__slider"}
        trackClass={"level-two__slide-track"}
        slideClass={"level-two__slide"}
        imgClass={"level-two__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[1]}
      />
      <Slider
        sliderClass={"level-two__slider"}
        trackClass={"level-two__slide-track"}
        slideClass={"level-two__slide"}
        imgClass={"level-two__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[2]}
      />
      <Slider
        sliderClass={"level-two__slider"}
        trackClass={"level-two__slide-track"}
        slideClass={"level-two__slide"}
        imgClass={"level-two__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[3]}
      />
      <Slider
        sliderClass={"level-two__slider"}
        trackClass={"level-two__slide-track"}
        slideClass={"level-two__slide"}
        imgClass={"level-two__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[4]}
      />
    </section>
  );
};

export default LevelTwo;
