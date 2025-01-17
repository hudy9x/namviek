export const generatePages = (n: number, start?: number) => {
  let startIndex = start;
  return new Array(n).fill(1).map((val, id) => {
    if (startIndex && startIndex > 0) {
      startIndex += 1;
      return {
        page: startIndex,
      };
    }

    return { page: id + 1 };
  });
};

export const randomId = function (length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
