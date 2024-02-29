import { checkIfValid } from "../utils/checkIfValid.util";
import { addValidQuestion, removeValidQuestion } from "../../../utils/queriesQuestionsList.util";
import { FieldState } from "../../../state/FieldState";
import { ClassNamesEnum } from "../../../enum/classNames.enum";

export const eventHandlerKeyup = (event: KeyboardEvent): void => {
  const el = event.target as HTMLInputElement;

  const state = FieldState;

  if (!el) {
    return;
  }

  const key = event.code || event.key || event.which.toString();
  switch (key) {
    case "Backspace":
    case "8":
    case "Delete":
    case "NumpadDecimal":
    case "46":
      break;
    default:
      if (el.value && el.checkValidity() && state.currentEl && state.currentIndex !== undefined && state.currentGroup) {
        if (state.currentIndex !== state.currentGroup?.length - 1) {
          state.currentGroup[state.currentIndex + 1].focus();
          state.currentGroup[state.currentIndex + 1].select();
          state.setState(state.currentGroup, state.currentIndex + 1);
        }
      }
  }

  console.log('state', state);

  const isValid = checkIfValid(state.currentGroup, state.answers[`field-${state.currentFieldKey}`]);
  if (isValid) {
    state.currentGroup?.forEach((el) => el.classList.add(ClassNamesEnum.SCANWORD_VALID));
    addValidQuestion(state.currentFieldKey);
  } else {
    state.currentGroup?.forEach((el) => el.classList.remove(ClassNamesEnum.SCANWORD_VALID));
    removeValidQuestion();
  }

  console.log({
    isValid: checkIfValid(state.currentGroup, state.answers[state.currentFieldKey]),
  });
};
