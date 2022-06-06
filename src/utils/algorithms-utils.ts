import {ICircleElement} from '../types/types';

export const swap = (
  arr: ICircleElement[] | string[],
  firstIndex: number,
  secondIndex: number
): void => {
  [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};
