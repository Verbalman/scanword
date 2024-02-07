import { ListModule } from "./modules/list.module";
import { FieldModule } from "./modules/field/field.module";

function init () {
  const appEl = document.getElementById('app');
  appEl.className = 'scanword';

  if (appEl) {
    const fieldEl = document.createElement('div');
    fieldEl.className = 'scanword-field';

    const listEl = document.createElement('div');
    listEl.className = 'scanword-list';

    const settingEl = document.createElement('div');
    settingEl.className = 'scanword-setting';

    appEl.appendChild(fieldEl);
    appEl.appendChild(listEl);
    appEl.appendChild(settingEl);

    FieldModule(fieldEl);
    ListModule(listEl);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.time('B');
  init();
  console.timeEnd('B');
});
