import React, {Dispatch, SetStateAction} from 'react';
import {swap} from '../../utils/algorithms-utils';
import {SHORT_DELAY_IN_MS} from '../../constants/delays';
import {ElementStates} from '../../types/element-states';
import {TBar} from '../../types/types';
import {setDelay} from '../../utils/utils';

const sortAndWait = async (
  arr: TBar[],
  barsSetter: Dispatch<SetStateAction<TBar[]>>
) => {
  barsSetter([...arr]);
  await setDelay(SHORT_DELAY_IN_MS);
};

export const selectionSort = async (
  mode: 'ascending' | 'descending',
  progressSetter: Dispatch<SetStateAction<boolean>>,
  setAscendingRunning: Dispatch<SetStateAction<boolean>>,
  setDescendingRunning: Dispatch<SetStateAction<boolean>>,
  barsSetter: Dispatch<SetStateAction<TBar[]>>,
  bars: TBar[]
) => {
  progressSetter(true);
  mode === 'ascending' ? setAscendingRunning(true) : setDescendingRunning(true);

  //Копируем массив из стейта и делаем все элементы дефолтными
  const arr = [...bars];
  arr.forEach(el => (el.state = ElementStates.Default));
  barsSetter([...arr]);
  // Начинаем цикл
  const {length} = arr;
  for (let i = 0; i < length; i++) {
    // Инициализация счётчика
    let swapInd = i;
    // Подсвечиваем элемент рыжим, который будет отсортирован
    arr[i].state = ElementStates.Selected;
    await sortAndWait(arr, barsSetter);
    // Начинаем цикл по оставшимся элементам
    for (let j = i + 1; j < length; j++) {
      // Подсвечиваем кандидата на свап фиолетовым
      arr[j].state = ElementStates.Changing;
      await sortAndWait(arr, barsSetter);
      if (
        (mode === 'ascending' ? arr[swapInd].num : arr[j].num) >
        (mode === 'ascending' ? arr[j].num : arr[swapInd].num)
      ) {
        // Если кандидат больше (меньше) текущего экстремума - то мы нашли второй элемент на свап,
        // подсвечиваем его рыжим, а старого кандидата либо делаем дефолтным,
        // либо оставляем рыжим (если это i-й элемент, для которого мы ищем кандидата)
        arr[j].state = ElementStates.Selected;
        arr[swapInd].state =
          i === swapInd ? ElementStates.Selected : ElementStates.Default;
        swapInd = j;
        await sortAndWait(arr, barsSetter);
      }
      // После визуальной сортировки меняем цвет текущего элемента, но не
      // рисуем его (не сортируем массив) он будет отрисован на следующем шаге
      arr[j].state =
        swapInd === j ? ElementStates.Selected : ElementStates.Default;
    }
    // Если сортируемый элемент сам является экстремумом - рисуем его как "modified"
    if (i === swapInd) {
      arr[i].state = ElementStates.Modified;
      await sortAndWait(arr, barsSetter);
    }
    // В противном случае нужен свап и замена цветов (нужно 2 рендера)
    else {
      swap(arr, i, swapInd);
      await sortAndWait(arr, barsSetter);
      arr[i].state = ElementStates.Modified;
      arr[swapInd].state = ElementStates.Default;
      await sortAndWait(arr, barsSetter);
    }
  }
  // Анлочим кнопки
  progressSetter(false);
  mode === 'ascending'
    ? setAscendingRunning(false)
    : setDescendingRunning(false);
};

export const bubbleSort = async (
  mode: 'ascending' | 'descending',
  progressSetter: Dispatch<SetStateAction<boolean>>,
  setAscendingRunning: Dispatch<SetStateAction<boolean>>,
  setDescendingRunning: Dispatch<SetStateAction<boolean>>,
  barsSetter: Dispatch<SetStateAction<TBar[]>>,
  bars: TBar[]
) => {
  // Лочим кнопки
  progressSetter(true);
  mode === 'ascending' ? setAscendingRunning(true) : setDescendingRunning(true);
  //Копируем массив из стейта и делаем все элементы дефолтными
  const arr = [...bars];
  arr.forEach(el => (el.state = ElementStates.Default));
  await sortAndWait(arr, barsSetter);
  // Начинаем цикл
  const {length} = arr;
  // Флаг свапа
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 0; i < length - 1; i++) {
      // Подсвечиваем выбранные элементы
      arr[i].state = ElementStates.Changing;
      arr[i + 1].state = ElementStates.Changing;
      await sortAndWait(arr, barsSetter);
      // Если один больше (меньше) другого - свапаем их
      if (
        (mode === 'ascending' ? arr[i].num : arr[i + 1].num) >
        (mode === 'ascending' ? arr[i + 1].num : arr[i].num)
      ) {
        arr[i].state = ElementStates.Selected;
        arr[i + 1].state = ElementStates.Selected;
        await sortAndWait(arr, barsSetter);
        swap(arr, i, i + 1);
        arr[i].state = ElementStates.Selected;
        arr[i + 1].state = ElementStates.Selected;
        await sortAndWait(arr, barsSetter);
        swapped = true;
      }
      // После визуальной сортировки меняем цвет текущего элемента, но не
      // рисуем его (не сортируем массив) он будет отрисован на следующем шаге
      arr[i].state = ElementStates.Default;
      arr[i + 1].state = ElementStates.Default;
    }
  } while (swapped);
  // Массив отсортирован
  arr.forEach(el => (el.state = ElementStates.Modified));
  barsSetter([...arr]);
  // Анлочим кнопки
  progressSetter(false);
  mode === 'ascending'
    ? setAscendingRunning(false)
    : setDescendingRunning(false);
};
