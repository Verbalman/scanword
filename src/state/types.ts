export interface FieldStateI {
  // fragmentInputs: HTMLInputElement[] | undefined;
  currentGroup:  HTMLInputElement[] | undefined;
  currentEl:  HTMLInputElement | undefined;
  currentIndex: number | undefined;
  currentFieldKey: string | undefined;
  setState: (group: HTMLInputElement[], index: number, fieldKey?: string) => void;
  clearState: () => void;
  // setFragmentInputs: (inputs: HTMLInputElement[]) => void;

  answers: { [key: string]: string },
  setAnswers: (list: { [key: string]: string }) => void;

  subscribers: any[];
  subscribe: any;
}
