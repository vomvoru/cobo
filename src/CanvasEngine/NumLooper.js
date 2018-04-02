const create = (initNum = 0, initMax = 0) => {
  let num = initNum;
  let max = initMax;

  const isLast = () => num >= max;

  const getNum = () => num;
  const next = () => {
    if (isLast()) {
      num = 0;
    } else {
      num = num + 1;
    }

    return num;
  };
  const getMax = () => max;
  const setMax = newMax => (max = newMax);

  return {
    next,
    getNum,
    getMax,
    setMax,
    isLast
  };
};

export default {
  create
};
