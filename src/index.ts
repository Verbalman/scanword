import { FieldModule } from "./modules/field/field.module";
import { ListModule } from "./modules/list/list.module";
import { FieldState } from "./state/FieldState";
import { getAnswersList } from "./utils/getAnswersList.util";
import { ListModel } from "./models/list/list.model";
import { ClassNamesEnum } from "./enum/classNames.enum";
import { setStyles } from "./core/styles";
import { CONFIG, ConfigI } from "./const/config.const";

function init (options?: ConfigI) {
  const appEl = document.getElementById('app');
  appEl.className = ClassNamesEnum.SCANWORD;

  const config = options ? {
    field: {
      ...CONFIG.field,
      ...options?.field
    },
    scanword: {
      ...CONFIG.scanword,
      ...options?.scanword
    }
  } as ConfigI : CONFIG;

  if (appEl) {
    setStyles(config);

    const fieldEl = document.createElement('div');
    fieldEl.className = ClassNamesEnum.SCANWORD_FIELDS;

    const listEl = document.createElement('div');
    listEl.className = ClassNamesEnum.SCANWORD_LIST;

    appEl.appendChild(fieldEl);
    appEl.appendChild(listEl);

    const state = FieldState;
    state.setAnswers(getAnswersList(ListModel));

    FieldModule(fieldEl, config);
    ListModule(listEl);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.time('SCANWORD');
  init();
  console.timeEnd('SCANWORD');
});
