export const eventHandlerKeypress = (event: KeyboardEvent) => {
  const el = event.target as HTMLInputElement;

  const key = event.code || event.key || event.which.toString();
  switch (key) {
    case "ArrowLeft":
    case "37":
    case "ArrowUp":
    case "38":
    case "ArrowRight":
    case "39":
    case "ArrowDown":
    case "40":
    case "Tab":
    case "9":
    case "Escape":
    case "27":
    case "Cancel":
    case "3":
    case "PageUp":
    case "33":
    case "Numpad9":
    case "PageDown":
    case "34":
    case "Numpad3":
    case "Backspace":
    case "8":
    case "Delete":
    case "NumpadDecimal":
    case "46":
      event.preventDefault();
      event.stopPropagation();
      return false;
  }
};
