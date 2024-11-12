// src/utils/DataFusion.js

export const fuseData = (orderedData) => {
  const fusedData = {};
  orderedData.forEach((item) => {
    fusedData[item.type] = item.data;
  });
  return fusedData;
};
