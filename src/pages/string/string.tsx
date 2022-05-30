import React, {useState, FormEvent} from 'react';
import {SolutionLayout} from '../../components/ui/solution-layout/solution-layout';
import {Input} from '../../components/ui/input/input';
import {Button} from '../../components/ui/button/button';
import {Circle} from '../../components/ui/circle/circle';
import {TStringChar} from '../../types/types';
import InputWrapper from '../../components/input-wrapper/input-wrapper';
import styles from './string.module.css';
import swapChars from './utils';

const StringPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [lettersArr, setLettersArr] = useState<TStringChar[]>([]);
  const [inProgress, setInProgress] = useState(false);

  return (
    <SolutionLayout title="Строка">
      <form
        onSubmit={evt => {
          evt.preventDefault();
          swapChars(inputValue, setInputValue, setLettersArr, setInProgress);
        }}>
        <InputWrapper>
          <Input
            disabled={inProgress}
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
          />
        </InputWrapper>
      </form>

      <ul className={styles.circleList}>
        {lettersArr.map((char, idx) => {
          return <Circle state={char.state} letter={char.char} key={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};

export default StringPage;
