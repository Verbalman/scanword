import { ListModel } from "../../models/list/list.model";


export function FieldModule(parentEl: HTMLElement | ChildNode): void {
  if (!parentEl) {
    return;
  }

  const answersArray = ListModel.map((item) => item.answer);
  const answersForRenderArray = answersArray.map((item) => item.replace(/ /g, '').split(''));

  const markup = answersForRenderArray
    .map((i, index) =>
      `<div class="fieldset"><div style="position: absolute;">${index + 1}</div>${
        i.map((j) =>
          `<div>
            <input 
                type="text" 
                pattern="${j.toLowerCase()}|${j.toUpperCase()}" 
                required 
                maxlength="1" 
                minlength="1"
                data-value="${j}"
            >
          </div>`
        ).join('')
      }</div>`
    )
    .join('');

  const fragment = document.createRange().createContextualFragment(`<div class="scanword-field-form">${markup}</div>`);

  const eventHandlerInput = (event: InputEvent): void => {
    console.log('InputEvent:', event);
    const el = event.target as HTMLInputElement;
    if (el.value) {
      const isValid = el.checkValidity();
      const nextInput = el.parentElement?.nextSibling?.['children']?.[0];
      if (isValid && nextInput) {
        nextInput.focus();
      }
    }
  };

  const eventHandlerKeydown = (event: KeyboardEvent): void => {
    if (event.code !== 'Backspace') {
      return;
    }

    console.log('KeyboardEvent:', event);

    const el = event.target as HTMLInputElement;
    const prevInput = el.parentElement?.previousSibling?.['children']?.[0];
    if (prevInput) {
      setTimeout(() => prevInput.focus());
    }
  };

  fragment.querySelectorAll('input').forEach((el) => {
    el.addEventListener('input', eventHandlerInput);
    el.addEventListener('keydown', eventHandlerKeydown);
  });

  parentEl.appendChild(fragment);
}
