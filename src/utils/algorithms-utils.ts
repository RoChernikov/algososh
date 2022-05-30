import {TStringChar} from '../types/types';

export const swapElements = (
  arr: TStringChar[],
  firstIndex: number,
  secondIndex: number
): void => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};

export const getFibArray = (n: number): number[] => {
  let arr: number[] = [0, 1];
  for (let i = 2; i <= n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr.slice(1);
};
