export function render(markup): DocumentFragment {
  console.log('typeof markup:', typeof markup);

  const fragment = document.createRange().createContextualFragment(markup);

  // fragment.addEventListener('click', () => {
  //   console.log(123);
  // });


  const onClickRegex = new RegExp(/(?<first>onclick)=".*"/gm);
  console.log('test', onClickRegex.test(markup));

  return fragment;
}

export function render2(options): DocumentFragment | void {

}

export function renderButton(options: {
  label: string;
  type: 'button' | 'submit',
  onclick?: () => any,
}) {
  // const el = document.createElement('button');
  // el.textContent = options.label;
  // el.type = options.type;
  //
  // if (options.onclick) {
  //   el.addEventListener('click', options.onclick);
  // }

  const el = document.createRange().createContextualFragment(`
  <button id="test" type="${options.type}">${options.label}</button>
  `);

  // console.log('el', el);

  if (options.onclick) {
    el.firstElementChild.addEventListener('click', options.onclick);
  }

  return el;
}
