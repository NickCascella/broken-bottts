import axios from "axios";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import { v4 as uuid } from "uuid";

const levelOneBottts = () => {
  let levelOne = {};
  let levelOneBottts = [];
  const targetBottt = createAvatar(style, {
    dataUri: true,
    seed: uuid(),
  });
  for (let i = 0; i < 14; i++) {
    levelOneBottts.push(
      createAvatar(style, {
        dataUri: true,
        seed: uuid(),
      })
    );
  }
  levelOneBottts.push(targetBottt);
  levelOne.targetBottt = targetBottt;
  levelOne.allBottts = levelOneBottts;
  return levelOne;
};

const levelTwoBottts = (botttStyles) => {
  let levelTwo = {};
  let levelTwoBottts = [];
  let primaryColourLevel =
    botttStyles.primary_colour_levels[
      Math.floor(botttStyles.primary_colour_levels.length * Math.random())
    ];
  let secondaryColourLevel =
    botttStyles.secondary_colour_levels[
      Math.floor(botttStyles.secondary_colour_levels.length * Math.random())
    ];

  const targetBottt = createAvatar(style, {
    dataUri: true,
    seed: uuid(),
    primaryColorLevel: primaryColourLevel,
    secondaryColorLevel: secondaryColourLevel,
  });
  for (let i = 0; i < 24; i++) {
    levelTwoBottts.push(
      createAvatar(style, {
        dataUri: true,
        seed: uuid(),
        primaryColorLevel: primaryColourLevel,
        secondaryColorLevel: secondaryColourLevel,
      })
    );
  }
  levelTwoBottts.push(targetBottt);
  levelTwo.targetBottt = targetBottt;
  levelTwo.allBottts = levelTwoBottts;
  return levelTwo;
};

const getBottts = async () => {
  try {
    const botttStylesData = await axios.get(
      `${process.env.REACT_APP_URL}/bottts/styles`
    );
    const botttStyles = botttStylesData.data.results[0];
    let bottts = {};
    bottts.levelOne = levelOneBottts();
    bottts.levelTwo = levelTwoBottts(botttStyles);
    return bottts;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getBrokenBottts = () => {
  let placeholderBottts = {};
  let svg = () =>
    createAvatar(style, {
      dataUri: true,
      seed: uuid(),
      primaryColorLevel: 8,
    });
  placeholderBottts.botttOne = svg();
  placeholderBottts.botttTwo = svg();
  placeholderBottts.botttThree = svg();
  placeholderBottts.botttFour = svg();
  return placeholderBottts;
};

export default getBottts;
export { getBrokenBottts };
