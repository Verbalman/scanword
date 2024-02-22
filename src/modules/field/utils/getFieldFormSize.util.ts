import { ListModelI } from "../../../models/list/types";

export const getFieldFormSizeUtil = (list: ListModelI[], stepSize: number): number[] => {
  return list.reduce(([maxX, maxY], item) => {
    const [ x, y ] = item.position;
    const length = item.answer.length;

    return [
      item.isHorizontal ? Math.max(maxX, x + length - 1) : maxX,
      !item.isHorizontal ? Math.max(maxY, y + length - 1) : maxY,
    ];
  }, [0, 0]).map((i) => stepSize * i);
}
