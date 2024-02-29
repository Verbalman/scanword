import { ListModelI } from "../models/list/types";

export const getAnswersList = (list: ListModelI[]): {[key: string]: string} => {
  const result = {};
  list?.forEach((item, index) => {
    result[`field-${index + 1}`] = item.answer;
  });
  return result;
}
