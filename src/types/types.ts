import {ElementStates} from './element-states';

export interface ICircleElement {
  tail?: string;
  head?: string;
  char?: string | null;
  state: ElementStates;
}

export type TBar = {
  num: number;
  state: ElementStates;
};
