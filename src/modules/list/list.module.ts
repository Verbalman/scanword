import { ListModel } from "../../models/list/list.model";
import { lifeCycleObserving } from "../../core/life-cycle";

export function ListModule(parentEl: HTMLElement | ChildNode): void {
  if (!parentEl) {
    return;
  }

  const listModuleEl = document.createElement('div');

  let hMarkup = '';
  let vMarkup = '';
  ListModel.forEach((item, i) => {
    const {
      answer,
      isHorizontal,
      position,
      number,
      question,
    } = item;
    const index = number || i + 1;

    if (isHorizontal) {
      hMarkup += `<li class="question question-${index}" data-field="${index}" tabindex="1" role="button" style="cursor: pointer"><b>${index}.</b> ${question}</li>`;

    } else {
      vMarkup += `<li class="question question-${index}" data-field="${index}" tabindex="1" role="button" style="cursor: pointer"><b>${index}.</b> ${question}</li>`;
    }
  });

  // console.log('hMarkup:', hMarkup);
  // console.log('vMarkup:', vMarkup);

  const fragment = document.createRange().createContextualFragment(`
    <div><h3>За горизонталлю:</h3><ul>${hMarkup}</ul></div>
    <div><h3>За вертикаллю:</h3><ul>${vMarkup}</ul></div>
  `);

  fragment?.querySelectorAll('li')?.forEach((el) => {
    el?.addEventListener('click', (event) => {

      document.querySelectorAll('.question')?.forEach((el) => el.classList.remove('active'));
      document.querySelectorAll('.scanword-field-form .active')?.forEach((el) => el.classList.remove('active'));

      const el = event.target as HTMLLIElement;
      console.log('Li Click!', {el: el.dataset.field});
      el.classList.add('active');


      document.querySelectorAll(`.field-${el.dataset.field} input`)?.forEach((input: HTMLInputElement, index) => {
        input.classList.add('active');

        if (index === 0) {
          input.focus();
        }
      });
    })
  });

  listModuleEl.appendChild(fragment);

  // const render = (): void => {
  //   let res = '';
  //   questionsArray.forEach((question, index) => res += `<li id="${question}">${question}</li>`);
  //   const fragment = document.createRange().createContextualFragment(res);
  //   ulEl.replaceChildren(fragment);
  // };
  //
  // render();
  // lifeCycleObserving(listModuleEl, {});
  // listModuleEl.appendChild(ulEl);
  parentEl.appendChild(listModuleEl);
}
