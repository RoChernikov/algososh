import {swap} from '../../utils/algorithms-utils';
import {ElementStates} from '../../types/element-states';
import {TBar} from '../../types/types';

// ***********************СОРТИРОВКА ВЫБОРОМ***********************
export const selectionSortAlgorithm = (
  mode: 'ascending' | 'descending',
  arrayToSort: TBar[],
  step?: number
): {resArr: TBar[]; numberOfSteps: number} => {
  // Создаем копию массива столбцов и меняем стейт на Default
  const arr = [...arrayToSort];
  arr.forEach(el => (el.state = ElementStates.Default));
  // Начало цикла
  const {length} = arr;
  let currentStep = 0;
  for (let i = 0; i < length; i++) {
    let swapIdx = i;
    arr[i].state = ElementStates.Selected;
    currentStep++;

    if (step === currentStep) return {resArr: arr, numberOfSteps: currentStep};
    for (let j = i + 1; j < length; j++) {
      arr[j].state = ElementStates.Changing;
      currentStep++;

      if (step === currentStep)
        return {resArr: arr, numberOfSteps: currentStep};
      if (
        (mode === 'ascending' ? arr[swapIdx].num : arr[j].num) >
        (mode === 'ascending' ? arr[j].num : arr[swapIdx].num)
      ) {
        arr[j].state = ElementStates.Selected;
        arr[swapIdx].state =
          i === swapIdx ? ElementStates.Selected : ElementStates.Default;
        swapIdx = j;
        currentStep++;

        if (step === currentStep)
          return {resArr: arr, numberOfSteps: currentStep};
      }
      if (j !== swapIdx) arr[j].state = ElementStates.Default;
    }
    if (i === swapIdx) {
      arr[i].state = ElementStates.Modified;
      currentStep++;

      if (step === currentStep)
        return {resArr: arr, numberOfSteps: currentStep};
    } else {
      swap(arr, i, swapIdx);
      arr[i].state = ElementStates.Modified;
      currentStep++;

      if (step === currentStep)
        return {resArr: arr, numberOfSteps: currentStep};

      arr[swapIdx].state = ElementStates.Default;
      currentStep++;

      if (step === currentStep)
        return {resArr: arr, numberOfSteps: currentStep};
    }
  }
  return {resArr: arr, numberOfSteps: currentStep};
};

// ***********************СОРТИРОВКА ПУЗЫРЬКОМ***********************
export const bubbleSortAlgorithm = (
  mode: 'ascending' | 'descending',
  arrayToSort: TBar[],
  step?: number
): {resArr: TBar[]; numberOfSteps: number} => {
  // Создаем копию массива столбцов и меняем стейт на Default
  const arr = [...arrayToSort];
  arr.forEach(el => (el.state = ElementStates.Default));
  // Начало цикла
  const {length} = arr;
  let currentStep = 0;
  for (let i = 0; i < length; i++) {
    for (let k = 0; k < length - 1 - i; k++) {
      arr[k].state = ElementStates.Changing;
      arr[k + 1].state = ElementStates.Changing;
      currentStep++;

      if (step === currentStep)
        return {resArr: arr, numberOfSteps: currentStep};
      if (
        (mode === 'ascending' ? arr[k].num : arr[k + 1].num) >
        (mode === 'ascending' ? arr[k + 1].num : arr[k].num)
      ) {
        arr[k].state = ElementStates.Selected;
        arr[k + 1].state = ElementStates.Selected;
        currentStep++;

        if (step === currentStep)
          return {resArr: arr, numberOfSteps: currentStep};
        swap(arr, k, k + 1);
        arr[k].state = ElementStates.Selected;
        arr[k + 1].state = ElementStates.Selected;
        currentStep++;

        if (step === currentStep)
          return {resArr: arr, numberOfSteps: currentStep};
      }
      arr[k].state = ElementStates.Default;
      arr[k + 1].state = ElementStates.Default;
    }
    // Меняет стейт отсортированных столбцов на Modified
    arr[arr.length - 1 - i].state = ElementStates.Modified;
  }
  arr.forEach(el => (el.state = ElementStates.Modified));
  return {resArr: arr, numberOfSteps: currentStep};
};
