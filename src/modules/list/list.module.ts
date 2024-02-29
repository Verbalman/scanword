import { ListModel } from "../../models/list/list.model";
import { sortInputsGroup } from "../../utils/sortInputsGroup.util";
import { FieldState } from "../../state/FieldState";
import { removeActiveQuestion } from "../../utils/queriesQuestionsList.util";
import { ClassNamesEnum } from "../../enum/classNames.enum";

export function ListModule(parentEl: HTMLElement | ChildNode): void {
  if (!parentEl) {
    return;
  }

  const state = FieldState;
  const listModuleEl = document.createElement('div');

  let hMarkup = '';
  let vMarkup = '';
  ListModel.forEach((item, i) => {
    const {
      answer,
      isHorizontal,
      number,
      question,
    } = item;
    const index = number || i + 1;

    if (isHorizontal) {
      hMarkup += `<li class="${ClassNamesEnum.SCANWORD_QUESTION} ${ClassNamesEnum.SCANWORD_QUESTION}-${index}" data-field="${index}" tabindex="1" role="button" style="cursor: pointer"><b>${index}.</b> ${question} [(${answer})]</li>`;

    } else {
      vMarkup += `<li class="${ClassNamesEnum.SCANWORD_QUESTION} ${ClassNamesEnum.SCANWORD_QUESTION}-${index}" data-field="${index}" tabindex="1" role="button" style="cursor: pointer"><b>${index}.</b> ${question} [(${answer})]</li>`;
    }
  });

  const fragment = document.createRange().createContextualFragment(`
    <div><h3>За горизонталлю:</h3><ul>${hMarkup}</ul></div>
    <div><h3>За вертикаллю:</h3><ul>${vMarkup}</ul></div>
  `);

  const eventHandlerClick = (event: MouseEvent): void => {
    removeActiveQuestion();

    const el = event.target as HTMLLIElement;
    el.classList.add(ClassNamesEnum.SCANWORD_ACTIVE);

    state.currentGroup?.forEach((input) => input.classList.remove(ClassNamesEnum.SCANWORD_ACTIVE));

    const inputsGroup = document.querySelectorAll<HTMLInputElement>(`.${ClassNamesEnum.SCANWORD_FIELD}-${el.dataset.field} input`);
    const sortedInputsGroup = sortInputsGroup(inputsGroup, el.dataset.field);

    state.setState(sortedInputsGroup, 0, el.dataset.field);

    sortedInputsGroup.forEach((input, index) => {
      if (input) {
        input.classList.add(ClassNamesEnum.SCANWORD_ACTIVE);

        if (index === 0) {
          input.focus();
        }
      }
    })
  };

  fragment?.querySelectorAll('li')?.forEach((el) => el?.addEventListener('click', eventHandlerClick));

  listModuleEl.appendChild(fragment);
  parentEl.appendChild(listModuleEl);
}
