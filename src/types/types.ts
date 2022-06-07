import {ElementStates} from './element-states';

export interface ICircleElement {
  adding?: boolean;
  deleting?: boolean;
  withoutArrow?: boolean;
  tail?: string;
  head?: string;
  char?: string | null;
  extraCircle?: {
    char: string;
  };
  state: ElementStates;
}

export type TBar = {
  num: number;
  state: ElementStates;
};

export type TElStateList = {
  isAddingToHead: boolean;
  isAddingToTail: boolean;
  isDeletingFromHead: boolean;
  isDeletingFromTail: boolean;
  isAddingByIdx: boolean;
  isDeletingByIdx: boolean;
};
