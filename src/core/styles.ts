import { ConfigI } from "../const/config.const";
import { ClassNamesEnum } from "../enum/classNames.enum";

export function setStyles(config: ConfigI): void {
  const id = 'scanword-style';

  if (document.getElementById(id)) {
    return;
  }

  try {
    const css = `
      .scanword * { 
        box-sizing: border-box; 
        margin: 0; 
        padding: 0
      }
      .scanword .${ClassNamesEnum.SCANWORD_FIELDS_BOX} {
        display: flex;
        position: relative; 
        background-color: ${config.scanword.backgroudColor};
      }
      .scanword .${ClassNamesEnum.SCANWORD_FIELD} { 
        position: absolute;
        background-color: ${config.field.backgroudColor};
      }
      .scanword .${ClassNamesEnum.SCANWORD_FIELD_NUMBER} {
        position: absolute;
        margin: 3px 0 0 2px;
        color: #000;
        font-size: 12px;
        font-weight: normal;
        font-family: inherit;
        font-style: normal;
        line-height: 12px;
        text-align: left;
        text-decoration: none;
        text-transform: uppercase;
      }
      .scanword .${ClassNamesEnum.SCANWORD_FIELD} input { 
        width: 100%;
        height: 100%;
        padding: 4px;
        color: ${config.field.color};
        font-size: ${config.field.textSize}px;
        font-weight: bold;
        font-family: inherit;
        font-style: normal;
        line-height: ${config.field.textSize}px;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        background-color: ${config.field.backgroudColor};
        border: none;
        outline: none;
        box-shadow:
          1px 0 0 0 ${config.scanword.backgroudColor},
          0 1px 0 0 ${config.scanword.backgroudColor},
          1px 1px 0 0 ${config.scanword.backgroudColor},
          1px 0 0 0 ${config.scanword.backgroudColor} inset,
          0 1px 0 0 ${config.scanword.backgroudColor} inset;
       }
      .scanword .${ClassNamesEnum.SCANWORD_FIELD} input.${ClassNamesEnum.SCANWORD_ACTIVE} { 
        color: ${config.field.activeColor};
        background: ${config.field.activeBackgroudColor};
        opacity: .75;
      }
      .scanword .${ClassNamesEnum.SCANWORD_FIELD} input.${ClassNamesEnum.SCANWORD_ACTIVE}:focus {
        opacity: 1;
      }
      .scanword .${ClassNamesEnum.SCANWORD_FIELD} input.${ClassNamesEnum.SCANWORD_VALID} {
        color: ${config.field.validColor}; 
        background: ${config.field.validBackgroudColor};
      }
    `;

    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = css.replace(/\s*\n\s*/g,"").replace(/: /g, ":");


    document.head.appendChild(style);
  } catch (e) {
    console.error('Cannot set scanword styles!', e);
  }
}
