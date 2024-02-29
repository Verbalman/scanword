import { FieldState } from "../../../state/FieldState";

export const eventHandlerKeydown = (event: KeyboardEvent) => {
  const el = event.target as HTMLInputElement;
  console.log('---Keydown event.code:', event.code, el.value, event);

  const state = FieldState;

  if (!el) {
    return;
  }

  const key = event.code || event.key || event.which.toString();
  switch (key) {
    case "Backspace":
    case "8":
    case "Delete":
    case "NumpadDecimal":
    case "46":
      if (!el.value && state.currentEl && state.currentIndex !== undefined && state.currentGroup) {
        if (state.currentIndex == 0) {
          state.setState(state.currentGroup, 0);
        } else {
          state.currentGroup[state.currentIndex - 1].focus();
          state.currentGroup[state.currentIndex - 1].select();
          state.setState(state.currentGroup, state.currentIndex - 1);
        }
      }
  }
};
