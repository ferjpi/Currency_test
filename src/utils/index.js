export const formatRate = (rate) => {
  return rate.toFixed(5);
};

export const getColorCode = () => {
  var makeColorCode = "0123456789ABCDEF";
  var code = "#";
  for (var count = 0; count < 6; count++) {
    code = code + makeColorCode[Math.floor(Math.random() * 16)];
  }
  return code;
};
