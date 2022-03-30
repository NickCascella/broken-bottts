import axios from "axios";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import { v4 as uuid } from "uuid";
import requests from "./requests";

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
  levelOneBottts.splice(
    Math.floor(levelOneBottts.length * Math.random()),
    0,
    targetBottt
  );

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

  let customDesign = {
    dataUri: true,
    seed: uuid(),
    textureChance: 100,
    primaryColorLevel: primaryColourLevel,
    secondaryColorLevel: secondaryColourLevel,
  };

  const targetBottt = createAvatar(style, customDesign);
  for (let i = 0; i < 24; i++) {
    levelTwoBottts.push(createAvatar(style, { ...customDesign, seed: uuid() }));
  }
  levelTwoBottts.splice(
    Math.floor(levelTwoBottts.length * Math.random()),
    0,
    targetBottt
  );
  levelTwo.targetBottt = targetBottt;
  levelTwo.allBottts = levelTwoBottts;
  return levelTwo;
};

const levelThreeBottts = (botttStyles) => {
  let levelThree = {};
  let levelThreeBottts = [];

  let colourOne =
    botttStyles.colours[Math.floor(botttStyles.colours.length * Math.random())];
  let colourTwo =
    botttStyles.colours[Math.floor(botttStyles.colours.length * Math.random())];

  let customDesign = {
    dataUri: true,
    seed: uuid(),
    colors: [colourOne],
    textureChance: 100,
  };

  const targetBottt = createAvatar(style, customDesign);
  for (let i = 0; i < 41; i++) {
    levelThreeBottts.push(
      createAvatar(style, { ...customDesign, seed: uuid() })
    );
  }
  levelThreeBottts.splice(
    Math.floor(levelThreeBottts.length * Math.random()),
    0,
    targetBottt
  );
  levelThree.targetBottt = targetBottt;
  levelThree.allBottts = levelThreeBottts;
  return levelThree;
};

const levelFourBottts = () => {
  let levelFour = {};
  let levelFourBottts = [];

  let customDesign = {
    dataUri: true,
    seed: uuid(),
  };

  const targetBottt = createAvatar(style, customDesign);
  for (let i = 0; i < 39; i++) {
    levelFourBottts.push(createAvatar(style, { ...customDesign, flip: true }));
  }
  levelFourBottts.splice(
    Math.floor(levelFourBottts.length * Math.random()),
    0,
    targetBottt
  );
  levelFour.targetBottt = targetBottt;
  levelFour.allBottts = levelFourBottts;
  return levelFour;
};

const getBottts = async () => {
  const botttStyles = await requests.botttStyles();
  let bottts = {};
  bottts.levelOne = levelOneBottts();
  bottts.levelTwo = levelTwoBottts(botttStyles);
  bottts.levelThree = levelThreeBottts(botttStyles);
  bottts.levelFour = levelFourBottts();
  return bottts;
};

const getBrokenBottts = () => {
  let placeholderBottts = {};
  let svg = () =>
    createAvatar(style, {
      dataUri: true,
      seed: uuid(),
      primaryColorLevel: 1,
    });
  placeholderBottts.botttOne = svg();
  placeholderBottts.botttTwo = svg();
  placeholderBottts.botttThree = svg();
  placeholderBottts.botttFour = svg();
  return placeholderBottts;
};

export default getBottts;
export { getBrokenBottts };
