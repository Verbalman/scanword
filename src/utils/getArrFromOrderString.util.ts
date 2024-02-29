export const getArrFromOrderString = (str: string) => str?.split(',')?.map((i) => i?.split('-'));
