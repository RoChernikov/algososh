import {ElementStates} from './element-states';

export type TStringChar = {
  tail?: string;
  head?: string;
  char?: string;
  state: ElementStates;
};
