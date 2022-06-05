import {IStringChars} from '../types/types';

export const swap = (
  arr: IStringChars[] | string[],
  firstIndex: number,
  secondIndex: number
): void => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};
