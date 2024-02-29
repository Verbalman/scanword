import { ClassNamesEnum } from "../enum/classNames.enum";

export const removeActiveQuestion = () => document.querySelector(`.${ClassNamesEnum.SCANWORD_QUESTION}.${ClassNamesEnum.SCANWORD_ACTIVE}`)?.classList.remove(ClassNamesEnum.SCANWORD_ACTIVE);
export const addActiveQuestion = (index: string) => document.querySelector(`.${ClassNamesEnum.SCANWORD_QUESTION}-${index}`)?.classList.add(ClassNamesEnum.SCANWORD_ACTIVE);

export const removeValidQuestion = () => document.querySelector(`.${ClassNamesEnum.SCANWORD_QUESTION}.${ClassNamesEnum.SCANWORD_VALID}`)?.classList.remove(ClassNamesEnum.SCANWORD_VALID);
export const addValidQuestion = (index: string) => document.querySelector(`.${ClassNamesEnum.SCANWORD_QUESTION}-${index}`)?.classList.add(ClassNamesEnum.SCANWORD_VALID);
