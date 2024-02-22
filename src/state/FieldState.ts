import { FieldStateI } from "./types";

export const FieldState: FieldStateI = {
  currentGroup: undefined,
  currentIndex: undefined,
  currentEl: undefined,

  subscribers: [],

  setState: function (group: HTMLInputElement[], index: number) {
    this.currentGroup = group;
    this.currentIndex = index;
    this.currentEl = group[index];

    this.subscribers.forEach((fn) => fn());
  },

  clearState: function () {
    this.currentGroup = undefined;
    this.currentIndex = undefined;
    this.currentEl = undefined;

    this.subscribers.forEach((fn) => fn());
  },

  subscribe: function (calback: any) {
    this.subscribers.push(calback);
  },
}
