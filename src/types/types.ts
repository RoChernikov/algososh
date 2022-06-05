import {ElementStates} from './element-states';

export interface IStringChars {
  char?: string;
  state: ElementStates;
}

export type TBar = {
  num: number;
  state: ElementStates;
};
