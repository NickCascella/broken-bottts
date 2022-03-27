import "./LevelOne.scss";
import Slider from "../Slider/Slider";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const LevelOne = ({ levelData, setSelectedChoice }) => {
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
    let newArraySet = [setOne, setTwo, setThree];
    setSplitArray(newArraySet);
  }, []);

  if (!splitArray.length) return <div>loading...</div>;

  return (
    <section className="level-one">
      <Slider
        sliderClass={"level-one__slider"}
        trackClass={"level-one__slide-track"}
        slideClass={"level-one__slide"}
        imgClass={"level-one__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[0]}
      />
      <Slider
        sliderClass={"level-one__slider"}
        trackClass={"level-one__slide-track"}
        slideClass={"level-one__slide"}
        imgClass={"level-one__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[1]}
      />
      <Slider
        sliderClass={"level-one__slider"}
        trackClass={"level-one__slide-track"}
        slideClass={"level-one__slide"}
        imgClass={"level-one__img"}
        setSelectedChoice={setSelectedChoice}
        displayedImgs={splitArray[2]}
      />
    </section>
  );
};

export default LevelOne;
