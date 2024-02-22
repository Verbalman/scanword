export const getABOrderIndex = (a: string[][], b: string[][], item: string) => {
  return {
    orderA: a[0][0] === item ? a[0][1] : a[1][0] === item ? a[1][1] : 0,
    orderB: b[0][0] === item ? b[0][1] : b[1][0] === item ? b[1][1] : 0
  };
};
