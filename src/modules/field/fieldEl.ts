import { ListModelI } from "../../models/list/types";

export class FieldEl {

  el: HTMLDivElement | DocumentFragment | null = null; // HTMLInputElement

  #_val: string;

  constructor(listItem: ListModelI, value: string) {

    this.#_render(listItem);

    this.#_val = value;
  }

  #_render(data: ListModelI): void {
    // const markup = `
    //   <div class="fieldset">
    //           <input
    //               type="text"
    //               required
    //               maxlength="1"
    //               minlength="1"
    //               style="z-index: 5"
    //           >
    //         </div>
    // `;
    //
    // this.el = document.createRange().createContextualFragment(markup);

    const div = document.createElement('div');
    div.className = 'fieldset-box';

    const input = document.createElement('input');

    div.appendChild(input);

    this.el = div;

  }
}
