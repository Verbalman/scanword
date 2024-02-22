import { ListModel } from "../../models/list/list.model";
import { getFieldFormSizeUtil } from "./utils/getFieldFormSize.util";
import { FieldsetListI } from "./types";
import { getArrFromOrderString } from "./utils/getArrFromOrderString.util";
import { getABOrderIndex } from "./utils/getABOrderIndex.util";
import { FieldState } from "../../state/FieldState";

export function FieldModule(parentEl: HTMLElement | ChildNode): void {
  if (!parentEl) {
    return;
  }
  let timer: NodeJS.Timeout;

  const state = FieldState;
  const fieldsetList: FieldsetListI = {};
  const [
    fieldFormW,
    fieldFormH
  ] = getFieldFormSizeUtil(ListModel, 32);

  ListModel.forEach((item, i) => {
    const {
      answer,
      isHorizontal,
      position,
      number,
    } = item;
    const index = i + 1;
    const fieldKey = `field-${index}`;
    const cleanedAnswer = answer?.replace(/ /g, '') || '';
    const answerArray = Array.from(cleanedAnswer);

    answerArray.forEach((letter, j) => {
      const [ x, y ] = position;
      const [ xIterator, yIterator ] = isHorizontal ? [x + j, y] : [x, y + j];
      const key = `${xIterator},${yIterator}`;

      const left = 32 * (xIterator - 1);
      const top = 32 * (yIterator - 1);
      const sequenceNumber = (j === 0) ? (number || index) : undefined;

      const existingFieldset = fieldsetList[key];
      if (existingFieldset) {
        existingFieldset.classList += ` ${fieldKey}`;
        existingFieldset.answer += ` | ${answer}`;
        existingFieldset.number ||= sequenceNumber;
        existingFieldset.dataFieldset += `,${index}`;
        existingFieldset.order += `,${index}-${j + 1}`;
      } else {
        fieldsetList[key] = {
          classList: `${fieldKey}`,
          answer,
          left,
          top,
          number: sequenceNumber,
          key,
          dataFieldset: index.toString(),
          order: `${index}-${j + 1}`
        };
      }
    });
  });

  const markup = Object.values(fieldsetList).map((field) => {
    const number = field.number ? `<div style="position: absolute;">${field.number}</div>` : '';
    return `
            <div 
                class="fieldset-box ${field.classList}" 
                style="position: absolute; left: ${field.left}px; top: ${field.top}px;"
                data-position="${field.key}" 
                data-fieldset="${field.dataFieldset}"
                data-fieldset-order="${field.order}"
            >
            ${number}
              <input
                  type="text"
                  required
                  maxlength="1"
                  minlength="1"
                  data-fieldset-order="${field.order}"
                  tabindex="-1"
              >
            </div>`;
  }).join('');

  const fragment = document.createRange().createContextualFragment(
    `<div class="scanword-field-form" style="width: ${fieldFormW}px; height: ${fieldFormH}px;">${markup}</div>`
  );

  const eventHandlerKeydown = (event: KeyboardEvent) => {
    const el = event.target as HTMLInputElement;
    console.log('---Keydown event.code:', event.code, el.value, event);

    const _state = state;

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
        if (!el.value && _state.currentEl && _state.currentIndex !== undefined && _state.currentGroup) {
          if (_state.currentIndex == 0) {
            state.setState(state.currentGroup, 0);
          } else {
            state.currentGroup[state.currentIndex - 1].focus();
            state.currentGroup[state.currentIndex - 1].select();
            state.setState(state.currentGroup, state.currentIndex - 1);
          }
        }
    }
  };

  const eventHandlerKeypress = (event: KeyboardEvent) => {
    const el = event.target as HTMLInputElement;
    console.log('---Keypress event.code:', event.code, el.value, event);

    const key = event.code || event.key || event.which.toString();
    switch (key) {
      case "ArrowLeft":
      case "37":
      case "ArrowUp":
      case "38":
      case "ArrowRight":
      case "39":
      case "ArrowDown":
      case "40":
      case "Tab":
      case "9":
      case "Escape":
      case "27":
      case "Cancel":
      case "3":
      case "PageUp":
      case "33":
      case "Numpad9":
      case "PageDown":
      case "34":
      case "Numpad3":
      case "Backspace":
      case "8":
      case "Delete":
      case "NumpadDecimal":
      case "46":
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
  };

  const eventHandlerKeyup = (event: KeyboardEvent): void => {
    const el = event.target as HTMLInputElement;
    console.log('---Keyup event.code:', event.code, el.value, event);

    const _state = state;

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
        if (el.value && el.checkValidity() && _state.currentEl && _state.currentIndex !== undefined && _state.currentGroup) {
          if (_state.currentIndex !== _state.currentGroup?.length - 1) {
            state.currentGroup[state.currentIndex + 1].focus();
            state.currentGroup[state.currentIndex + 1].select();
            state.setState(state.currentGroup, state.currentIndex + 1);
          }
        }
    }
  };

  const eventHandlerFocus = (event: FocusEvent): void => clearTimeout(timer);

  const eventHandlerBlur = (event: FocusEvent): void => {
    timer = setTimeout(() => {
      state.currentGroup?.forEach((input: HTMLInputElement) => input.classList.remove('active'));

      state.currentGroup = undefined;
      state.currentEl = undefined;
      state.currentIndex = undefined;
    }, 10000);
  };

  const eventHandlerClick = (event: MouseEvent): void => {
    console.log('Click!');
    event.preventDefault();
    clearTimeout(timer);

    const el = event.target as HTMLInputElement;
    const parentEl = el.parentElement;
    const parentFormEl = parentEl.parentElement;

    if (!el || !parentEl || !parentFormEl) {
      return;
    }

    const parentDataset = el.parentElement.dataset;
    const fieldset = parentDataset.fieldset;

    state.currentGroup?.forEach((input) => input.classList.remove('active'));

    if (!fieldset) {
      return;
    }

    const fieldsetArray = parentDataset.fieldset.split(',');

    const inputsGroups: HTMLInputElement[][] = fieldsetArray.map((item, index) => {
      const list = parentFormEl.querySelectorAll<HTMLInputElement>(`.field-${item} input`);

      return Array.from(list).sort((a, b) => {
        const aFieldsetOrder = getArrFromOrderString(a.dataset?.fieldsetOrder);
        const bFieldsetOrder = getArrFromOrderString(b.dataset?.fieldsetOrder);
        const { orderA, orderB } = getABOrderIndex(aFieldsetOrder, bFieldsetOrder, item);
        return Number(orderA) > Number(orderB) ? 1 : -1;
      });
    });

    const setActiveClass = (group: HTMLInputElement[]): void => group?.forEach((input) => input.classList.add('active'));
    const [
      inputGroup1,
      inputGroup2
    ] = inputsGroups;

    const currentIndex1 = inputGroup1?.findIndex((input) => input === el);

    if (inputGroup1?.length && !inputGroup2?.length && currentIndex1 !== undefined) {
      state.setState(inputGroup1, currentIndex1);
      setActiveClass(inputGroup1);
      return;
    }

    const currentIndex2 = inputGroup2.findIndex((input) => input === el);

    if (currentIndex1 === 0) {
      state.setState(inputGroup1, currentIndex1);
      setActiveClass(inputGroup1);
      return;
    }

    if (currentIndex2 === 0) {
      state.setState(inputGroup2, currentIndex2);
      setActiveClass(inputGroup2);
      return;
    }

    if (currentIndex1 !== undefined && currentIndex1 > 0) {
      state.setState(inputGroup1, currentIndex1);
      setActiveClass(inputGroup1);
      return;
    }

    if (currentIndex2 !== undefined && currentIndex2 > 0) {
      state.setState(inputGroup2, currentIndex2);
      setActiveClass(inputGroup2);
      return;
    }
  };

  fragment.querySelectorAll('input').forEach((el) => {
    el.addEventListener('click', eventHandlerClick);
    el.addEventListener('focus', eventHandlerFocus);
    el.addEventListener('blur', eventHandlerBlur);
    el.addEventListener('keydown', eventHandlerKeydown);
    el.addEventListener('keypress', eventHandlerKeypress);
    el.addEventListener('keyup', eventHandlerKeyup);
  });

  parentEl.appendChild(fragment);
}
