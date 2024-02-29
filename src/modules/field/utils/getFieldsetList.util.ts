import { FieldsetListI } from "../types";
import { ListModelI } from "../../../models/list/types";
import { ClassNamesEnum } from "../../../enum/classNames.enum";

export const getFieldsetList = (list: ListModelI[], fieldSize: number): FieldsetListI | undefined => {
  if (!list?.length) {
    return undefined;
  }

  const fieldsetList: FieldsetListI = {};
  list.forEach((item, i) => {
    const {
      answer,
      isHorizontal,
      position,
      number,
    } = item;
    const index = i + 1;
    const fieldKey = `${ClassNamesEnum.SCANWORD_FIELD}-${index}`;
    const cleanedAnswer = answer?.replace(/ /g, '') || '';
    const answerArray = Array.from(cleanedAnswer);

    answerArray.forEach((letter, j) => {
      const [ x, y ] = position;
      const [ xIterator, yIterator ] = isHorizontal ? [x + j, y] : [x, y + j];
      const key = `${xIterator},${yIterator}`;

      const left = fieldSize * (xIterator - 1);
      const top = fieldSize * (yIterator - 1);
      const sequenceNumber = (j === 0) ? (number || index) : undefined;
      const orderStr = `${index}-${j + 1}`;

      const existingFieldset = fieldsetList[key];
      if (existingFieldset) {
        existingFieldset.classList += ` ${fieldKey}`;
        existingFieldset.number ||= sequenceNumber;
        existingFieldset.dataFieldset += `,${index}`;
        existingFieldset.order += `,${orderStr}`;
      } else {
        fieldsetList[key] = {
          classList: `${fieldKey}`,
          left,
          top,
          number: sequenceNumber,
          key,
          dataFieldset: index.toString(),
          order: orderStr
        };
      }
    });
  });

  return fieldsetList;
}
