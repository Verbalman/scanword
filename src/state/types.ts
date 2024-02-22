export interface FieldStateI {
  currentGroup:  HTMLInputElement[] | undefined;
  currentEl:  HTMLInputElement | undefined;
  currentIndex: number | undefined;
  setState: (group: HTMLInputElement[], index: number) => void;
  clearState: () => void;

  subscribers: any[];
  subscribe: any;
}
