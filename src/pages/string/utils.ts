import {Dispatch, SetStateAction} from 'react';
import {setDelay} from '../../utils/utils';
import {swapElements} from '../../utils/algorithms-utils';
import {DELAY_IN_MS} from '../../constants/delays';
import {ElementStates} from '../../types/element-states';
import {TStringChar} from '../../types/types';

const swapChars = async (
  value: string,
  valueSetter: Dispatch<SetStateAction<string>>,
  lettersSetter: Dispatch<SetStateAction<TStringChar[]>>,
  progressSetter: Dispatch<SetStateAction<boolean>>
) => {
  //очистка инпута + блокировка кнопки
  valueSetter('');
  progressSetter(true);
  //массив с объектами на основе строки
  const charsArr: TStringChar[] = [];
  value.split('').forEach(el => {
    charsArr.push({char: el, state: ElementStates.Default});
  });
  lettersSetter([...charsArr]);
  await setDelay();
  //начало алгоритма
  for (
    let arr = charsArr, start = 0, end = arr.length - 1;
    end >= start;
    start++, end--
  ) {
    //если символ всего 1 swap не нужен
    if (end === start) {
      charsArr[start].state = ElementStates.Modified;
      lettersSetter([...charsArr]);
      await setDelay(DELAY_IN_MS);
      progressSetter(false);
      // иначе swap
    } else {
      // Меняем стейт кружков на "changing"
      charsArr[start].state = ElementStates.Changing;
      charsArr[end].state = ElementStates.Changing;
      lettersSetter([...charsArr]);
      await setDelay(DELAY_IN_MS);
      // swap кружков
      swapElements(charsArr, start, end);
      // Меняем стейт кружков на "modified"
      charsArr[start].state = ElementStates.Modified;
      charsArr[end].state = ElementStates.Modified;
      lettersSetter([...charsArr]);
      await setDelay(DELAY_IN_MS);
    }
  }
  progressSetter(false);
};

export default swapChars;
