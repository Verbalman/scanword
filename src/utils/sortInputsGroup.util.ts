import { getArrFromOrderString } from "./getArrFromOrderString.util";
import { getABOrderIndex } from "./getABOrderIndex.util";

export const sortInputsGroup = (list: NodeListOf<HTMLInputElement>, item: string): HTMLInputElement[] => {
  return Array.from(list).sort((a, b) => {
    const aFieldsetOrder = getArrFromOrderString(a.dataset?.fieldsetOrder);
    const bFieldsetOrder = getArrFromOrderString(b.dataset?.fieldsetOrder);
    const { orderA, orderB } = getABOrderIndex(aFieldsetOrder, bFieldsetOrder, item);
    return Number(orderA) > Number(orderB) ? 1 : -1;
  });
}
