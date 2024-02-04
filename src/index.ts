import { ListModule } from "./modules/list.module";

function init () {
  const appEl = document.getElementById('app');

  if (appEl) {
    const clothEl = document.createElement('div');
    const listEl = document.createElement('div');
    const settingEl = document.createElement('div');
    appEl.appendChild(clothEl);
    appEl.appendChild(listEl);
    appEl.appendChild(settingEl);

    ListModule(listEl);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.time('B');
  init();
  console.timeEnd('B');
});
