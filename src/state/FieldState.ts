import { FieldStateI } from "./types";

export const FieldState: FieldStateI = {
  currentGroup: undefined,
  currentIndex: undefined,
  currentEl: undefined,
  currentFieldKey: undefined,
  answers: {},

  subscribers: [],


  setState: function (group: HTMLInputElement[], index: number, fieldKey?: string) {
    this.currentGroup = group;
    this.currentIndex = index;
    this.currentEl = group[index];

    if (fieldKey) {
      this.currentFieldKey = fieldKey;
    }

    this.subscribers.forEach((fn) => fn());
  },

  clearState: function () {
    this.currentGroup = undefined;
    this.currentIndex = undefined;
    this.currentEl = undefined;

    this.subscribers.forEach((fn) => fn());
  },

  setAnswers: function (list) {
    this.answers = list;
  },

  subscribe: function (calback: any) {
    this.subscribers.push(calback);
  },
}
