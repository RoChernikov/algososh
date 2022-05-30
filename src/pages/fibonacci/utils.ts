import {Dispatch, SetStateAction} from 'react';
import {getFibArray} from '../../utils/algorithms-utils';
import {SHORT_DELAY_IN_MS} from '../../constants/delays';
import {setDelay} from '../../utils/utils';

const calcFib = async (
  value: number,
  progressSetter: Dispatch<SetStateAction<boolean>>,
  numbersSetter: Dispatch<SetStateAction<number[]>>
) => {
  progressSetter(true);
  // получаем массив чисел фибоначчи
  const fibArray = [...getFibArray(value)];
  const renderFib: number[] = [];
  for (let num of fibArray) {
    renderFib.push(num);
    numbersSetter([...renderFib]);
    await setDelay(SHORT_DELAY_IN_MS);
  }
  progressSetter(false);
};

export default calcFib;
