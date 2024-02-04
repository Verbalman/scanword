import { ListModel } from "../models/list/list.model";
import { lifeCycleObserving } from "../core/life-cycle";

export function ListModule(parentEl: HTMLElement | ChildNode): void {
  if (!parentEl) {
    return;
  }

  const questionsArray = ListModel.map((item) => item.question);
  const listModuleEl = document.createElement('div');

  const ulEl = document.createElement('ul');

  const render = (): void => {
    let res = '';
    questionsArray.forEach((question) => res += `<li id="${question}">${question}-${Date.now()}</li>`);
    const fragment = document.createRange().createContextualFragment(res);
    ulEl.replaceChildren(fragment);
  };

  render();
  lifeCycleObserving(listModuleEl, {});
  listModuleEl.appendChild(ulEl);
  parentEl.appendChild(listModuleEl);
}
