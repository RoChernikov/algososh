import React, {useState, FormEvent} from 'react';
import {SolutionLayout} from '../../components/ui/solution-layout/solution-layout';
import {Input} from '../../components/ui/input/input';
import {Button} from '../../components/ui/button/button';
import {Circle} from '../../components/ui/circle/circle';
import {setDelay} from '../../utils/utils';
import {swapElements} from '../../utils/algorithms-utils';
import {TStringChar} from '../../types/types';
import {DELAY_IN_MS} from '../../constants/delays';
import {ElementStates} from '../../types/element-states';
import InputWrapper from '../../components/input-wrapper/input-wrapper';
import styles from './string.module.css';

const StringPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [letters, setLetters] = useState<TStringChar[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const swapChars = async (string: string) => {
    //очистка инпута + блокировка кнопки
    setInputValue('');
    setInProgress(true);
    //массив с объектами на основе строки
    const charsArr: TStringChar[] = [];
    string.split('').forEach(el => {
      charsArr.push({char: el, state: ElementStates.Default});
    });
    setLetters([...charsArr]);
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
        setLetters([...charsArr]);
        await setDelay(DELAY_IN_MS);
        setInProgress(false);
        // иначе swap
      } else {
        // Меняем стейт кружков на "changing"
        charsArr[start].state = ElementStates.Changing;
        charsArr[end].state = ElementStates.Changing;
        setLetters([...charsArr]);
        await setDelay(DELAY_IN_MS);
        // swap кружков
        swapElements(charsArr, start, end);
        // Меняем стейт кружков на "modified"
        charsArr[start].state = ElementStates.Modified;
        charsArr[end].state = ElementStates.Modified;
        setLetters([...charsArr]);
        await setDelay(DELAY_IN_MS);
      }
    }
    setInProgress(false);
  };

  return (
    <SolutionLayout title="Строка">
      <InputWrapper>
        <Input
          value={inputValue}
          onChange={(evt: FormEvent<HTMLInputElement>) =>
            setInputValue(evt.currentTarget.value)
          }
          isLimitText={true}
          maxLength={11}
        />
        <Button
          disabled={!inputValue}
          isLoader={inProgress}
          text="Развернуть"
          type="submit"
          onClick={() => swapChars(inputValue)}
        />
      </InputWrapper>
      <ul className={styles.circleList}>
        {letters.map((char, idx) => {
          return <Circle state={char.state} letter={char.char} key={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};

export default StringPage;
