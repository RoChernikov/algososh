import {swap} from '../../utils/algorithms-utils';

type TReverseRes = {res: string[]; numberOfSteps: number};

export const reverseString = (string: string, step?: number): TReverseRes => {
  const arrayOfChars = string.split('');
  let stepCounter = 0;
  let startIndex = 0;
  let endIndex = arrayOfChars.length - 1;
  while (endIndex >= startIndex) {
    if (step === stepCounter) break;
    swap(arrayOfChars, startIndex, endIndex);
    startIndex++;
    endIndex--;
    stepCounter++;
  }
  return {res: arrayOfChars, numberOfSteps: stepCounter};
};
