const organizeBots = (lvlData, amtOfRows, amtPerRow) => {
  let levelDataCopy = [...lvlData];
  let structuredSets = [];
  for (let i = 0; i < amtOfRows; i++) {
    let setOneA = levelDataCopy.splice(0, amtPerRow);
    let setOneB = [...setOneA];
    const setOne = setOneA.concat(setOneB);
    structuredSets.push(setOne);
  }
  return structuredSets;
};

export default organizeBots;
