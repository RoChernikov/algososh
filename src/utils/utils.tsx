import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from '../constants/delays';
import {ICircleElement} from '../types/types';

export const setDelay = (delay: number = DELAY_IN_MS): Promise<null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const getNumber = () => Math.floor(Math.random() * 100) + 1;

export const setElementsWithDelay = async (
  arr: ICircleElement[],
  setter: (arr: ICircleElement[]) => void,
  isLong?: boolean
) => {
  setter([...arr]);
  await setDelay(isLong ? DELAY_IN_MS : SHORT_DELAY_IN_MS);
};
