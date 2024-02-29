import { sortInputsGroup } from "../../../utils/sortInputsGroup.util";
import { addActiveQuestion, removeActiveQuestion } from "../../../utils/queriesQuestionsList.util";
import { FieldState } from "../../../state/FieldState";
import { ClassNamesEnum } from "../../../enum/classNames.enum";

export const eventHandlerClick = (event: MouseEvent): void => {
  console.log('Click!');
  event.preventDefault();

  const el = event.target as HTMLInputElement;
  const parentFormEl = el.parentElement.parentElement;

  if (!el || !parentFormEl) {
    return;
  }

  const state = FieldState;
  const parentDataset = el.parentElement.dataset;
  const fieldset = parentDataset.fieldset;

  state.currentGroup?.forEach((input) => input.classList.remove(ClassNamesEnum.SCANWORD_ACTIVE));

  if (!fieldset) {
    return;
  }

  const setActiveClass = (group: HTMLInputElement[]): void => group?.forEach((input) => input.classList.add(ClassNamesEnum.SCANWORD_ACTIVE));
  const fieldsetArray = fieldset.split(',');
  const inputsGroups: HTMLInputElement[][] = fieldsetArray.map((item, index) => {
    const list = parentFormEl.querySelectorAll<HTMLInputElement>(`.${ClassNamesEnum.SCANWORD_FIELD}-${item} input`);
    return sortInputsGroup(list, item);
  });
  const [
    inputGroup1,
    inputGroup2
  ] = inputsGroups;

  const currentIndex1 = inputGroup1?.findIndex((input) => input === el);

  if (inputGroup1?.length && !inputGroup2?.length && currentIndex1 !== undefined) {
    removeActiveQuestion();
    addActiveQuestion(fieldsetArray[0]);
    state.setState(inputGroup1, currentIndex1, fieldsetArray[0]);
    setActiveClass(inputGroup1);
    return;
  }

  const currentIndex2 = inputGroup2.findIndex((input) => input === el);

  if (currentIndex1 === 0) {
    removeActiveQuestion();
    addActiveQuestion(fieldsetArray[0]);
    state.setState(inputGroup1, currentIndex1, fieldsetArray[0]);
    setActiveClass(inputGroup1);
    return;
  }

  if (currentIndex2 === 0) {
    removeActiveQuestion();
    addActiveQuestion(fieldsetArray[1]);
    state.setState(inputGroup2, currentIndex2, fieldsetArray[1]);
    setActiveClass(inputGroup2);
    return;
  }

  if (currentIndex1 !== undefined && currentIndex1 > 0) {
    removeActiveQuestion();
    addActiveQuestion(fieldsetArray[0]);
    state.setState(inputGroup1, currentIndex1, fieldsetArray[0]);
    setActiveClass(inputGroup1);
    return;
  }

  if (currentIndex2 !== undefined && currentIndex2 > 0) {
    removeActiveQuestion();
    addActiveQuestion(fieldsetArray[1]);
    state.setState(inputGroup2, currentIndex2, fieldsetArray[1]);
    setActiveClass(inputGroup2);
  }
};
