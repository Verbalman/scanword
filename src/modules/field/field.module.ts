import { ListModel } from "../../models/list/list.model";
import { getFieldFormSizeUtil } from "./utils/getFieldFormSize.util";
import { FieldState } from "../../state/FieldState";
import { getFieldsetList } from "./utils/getFieldsetList.util";
import { eventHandlerKeyup } from "./handlers/keyup.handler";
import { eventHandlerClick } from "./handlers/click.handler";
import { eventHandlerKeypress } from "./handlers/keypress.handler";
import { eventHandlerKeydown } from "./handlers/keydown.hendler";
import { ClassNamesEnum } from "../../enum/classNames.enum";
import { ConfigI } from "../../const/config.const";

export function FieldModule(parentEl: HTMLElement | ChildNode, config: ConfigI): void {
  if (!parentEl) {
    return;
  }
  let timer: NodeJS.Timeout;

  const state = FieldState;
  const [
    fieldFormW,
    fieldFormH
  ] = getFieldFormSizeUtil(ListModel, config.field.size);
  const fieldsetList = getFieldsetList(ListModel, config.field.size);

  const markup = Object.values(fieldsetList).map((field) => {
    const number = field.number ? `<div class="${ClassNamesEnum.SCANWORD_FIELD_NUMBER}">${field.number}</div>` : '';
    const style = `left: ${field.left}px; top: ${field.top}px; width: ${config.field.size}px; height: ${config.field.size}px`;
    return `<div class="${ClassNamesEnum.SCANWORD_FIELD} ${field.classList}" style="${style}" data-position="${field.key}" data-fieldset="${field.dataFieldset}">
      ${number}
      <input type="text" data-fieldset-order="${field.order}" required maxlength="1" minlength="1" tabindex="-1">
    </div>`;
  }).join('');

  const style = `width: ${fieldFormW + 1}px; height: ${fieldFormH + 1}px;`;
  const fragment = document.createRange()
    .createContextualFragment(
      `<div class="${ClassNamesEnum.SCANWORD_FIELDS_BOX}" style="${style}">${markup}</div>`
    );

  const eventHandlerFocus = (event: FocusEvent): void => clearTimeout(timer);

  const eventHandlerBlur = (event: FocusEvent): void => {
    timer = setTimeout(() => {
      state.currentGroup?.forEach((input: HTMLInputElement) => input.classList.remove(ClassNamesEnum.SCANWORD_ACTIVE));

      state.currentGroup = undefined;
      state.currentEl = undefined;
      state.currentIndex = undefined;
    }, 10000);
  };

  const _eventHandlerClick = (event: MouseEvent) => {
    clearTimeout(timer);
    eventHandlerClick(event);
  };

  fragment.querySelectorAll('input').forEach((el) => {
    el.addEventListener('click', _eventHandlerClick);
    el.addEventListener('focus', eventHandlerFocus);
    el.addEventListener('blur', eventHandlerBlur);
    el.addEventListener('keydown', eventHandlerKeydown);
    el.addEventListener('keypress', eventHandlerKeypress);
    el.addEventListener('keyup', eventHandlerKeyup);
  });

  parentEl.appendChild(fragment);
}
