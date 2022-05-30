import {TStringChar} from '../types/types';

export const swapElements = (
  arr: TStringChar[],
  firstIndex: number,
  secondIndex: number
): void => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};
