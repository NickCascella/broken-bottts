import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import { v4 as uuid } from "uuid";
import requests from "./requests";

const levelOneBottts = () => {
  let levelOne = {};
  let levelOneBottts = [];
  let levelOneBotttsObjInfo = [];
  let targetBotttObjInfo = {
    dataUri: true,
    seed: uuid(),
  };

  const targetBottt = createAvatar(style, targetBotttObjInfo);
  for (let i = 0; i < 14; i++) {
    let randomBottt = {
      dataUri: true,
      seed: uuid(),
    };
    levelOneBotttsObjInfo.push(randomBottt);
    levelOneBottts.push(createAvatar(style, randomBottt));
  }
  let randomlySelectedIndex = Math.floor(levelOneBottts.length * Math.random());
  levelOneBottts.splice(randomlySelectedIndex, 0, targetBottt);
  levelOneBotttsObjInfo.splice(randomlySelectedIndex, 0, targetBotttObjInfo);

  levelOne.targetBottt = targetBottt;
  levelOne.allBottts = levelOneBottts;
  levelOne.targetBotttObjInfo = targetBotttObjInfo;
  levelOne.allBotttsObjInfo = levelOneBotttsObjInfo;
  return levelOne;
};

const levelTwoBottts = (botttStyles) => {
  let levelTwo = {};
  let levelTwoBottts = [];
  let levelTwoBotttsObjInfo = [];
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
    let customDesignCopy = { ...customDesign, seed: uuid() };
    levelTwoBotttsObjInfo.push(customDesignCopy);
    levelTwoBottts.push(createAvatar(style, customDesignCopy));
  }
  let randomlySelectedIndex = Math.floor(levelTwoBottts.length * Math.random());
  levelTwoBottts.splice(randomlySelectedIndex, 0, targetBottt);
  levelTwoBotttsObjInfo.splice(randomlySelectedIndex, 0, customDesign);
  levelTwo.targetBottt = targetBottt;
  levelTwo.allBottts = levelTwoBottts;
  levelTwo.targetBotttObjInfo = customDesign;
  levelTwo.allBotttsObjInfo = levelTwoBotttsObjInfo;
  return levelTwo;
};

const levelThreeBottts = (botttStyles) => {
  let levelThree = {};
  let levelThreeBottts = [];
  let levelThreeBotttsObjInfo = [];
  let colourOne =
    botttStyles.colours[Math.floor(botttStyles.colours.length * Math.random())];

  let customDesign = {
    dataUri: true,
    seed: uuid(),
    colors: [colourOne],
    textureChance: 100,
  };

  const targetBottt = createAvatar(style, customDesign);
  for (let i = 0; i < 41; i++) {
    let customDesignCopy = { ...customDesign, seed: uuid() };
    levelThreeBotttsObjInfo.push(customDesignCopy);
    levelThreeBottts.push(createAvatar(style, customDesignCopy));
  }
  let randomlySelectedIndex = Math.floor(
    levelThreeBottts.length * Math.random()
  );
  levelThreeBotttsObjInfo.splice(randomlySelectedIndex, 0, customDesign);
  levelThreeBottts.splice(randomlySelectedIndex, 0, targetBottt);
  levelThree.targetBottt = targetBottt;
  levelThree.allBottts = levelThreeBottts;
  levelThree.targetBotttObjInfo = customDesign;
  levelThree.allBotttsObjInfo = levelThreeBotttsObjInfo;
  return levelThree;
};

const levelFourBottts = () => {
  let levelFour = {};
  let levelFourBottts = [];
  let levelFourBotttsObjInfo = [];
  let customDesign = {
    dataUri: true,
    seed: uuid(),
  };

  const targetBottt = createAvatar(style, { ...customDesign, rotate: 3 });
  for (let i = 0; i < 39; i++) {
    let customDesignCopy = { ...customDesign, flip: true };
    levelFourBotttsObjInfo.push(customDesignCopy);
    levelFourBottts.push(createAvatar(style, customDesignCopy));
  }
  let randomlySelectedIndex = Math.floor(
    levelFourBottts.length * Math.random()
  );
  levelFourBotttsObjInfo.splice(randomlySelectedIndex, 0, customDesign);
  levelFourBottts.splice(randomlySelectedIndex, 0, targetBottt);

  levelFour.targetBottt = targetBottt;
  levelFour.allBottts = levelFourBottts;
  levelFour.targetBotttObjInfo = customDesign;
  levelFour.allBotttsObjInfo = levelFourBotttsObjInfo;
  return levelFour;
};

const getBottts = async () => {
  const botttStyles = await getBotttStyles();
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

const convertSeedData = (seedData) => {
  let convertObjData = (obj) => {
    let svgArray = obj.allBotttsObjInfo.map((data) => {
      return createAvatar(style, data);
    });
    return {
      targetBottt: createAvatar(style, obj.targetBotttObjInfo),
      allBottts: svgArray,
    };
  };
  let bottts = {
    levelOne: convertObjData(seedData.levelOne),
    levelTwo: convertObjData(seedData.levelTwo),
    levelThree: convertObjData(seedData.levelThree),
    levelFour: convertObjData(seedData.levelFour),
  };

  return bottts;
};

const renderBotImg = (details) => {
  return createAvatar(style, details);
};

const getBotttStyles = async () => {
  const botttStyles = await requests.botttStyles();
  return botttStyles;
};

export default getBottts;
export { getBrokenBottts, convertSeedData, renderBotImg, getBotttStyles };
