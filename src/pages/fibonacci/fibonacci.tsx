import React, {useState, FormEvent} from 'react';
import {SolutionLayout} from '../../components/ui/solution-layout/solution-layout';
import {Input} from '../../components/ui/input/input';
import {Button} from '../../components/ui/button/button';
import {Circle} from '../../components/ui/circle/circle';
import InputWrapper from '../../components/input-wrapper/input-wrapper';
import styles from './fibonacci.module.css';
import calcFib from './utils';

const FibonacciPage: React.FC = () => {
  const maxValue = 19;
  const [inputValue, setInputValue] = useState<number>();
  const [numbersArr, setNumbersArr] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState(false);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form
        onSubmit={evt => {
          evt.preventDefault();
          inputValue && calcFib(inputValue, setInProgress, setNumbersArr);
          setInputValue(0);
        }}>
        <InputWrapper>
          <Input
            disabled={inProgress}
            placeholder="Введите число от 1 до 19"
            type="number"
            min={1}
            value={inputValue || ''}
            onChange={(evt: FormEvent<HTMLInputElement>) =>
              setInputValue(
                Number(evt.currentTarget.value.replace(/[^0-9]/g, ''))
              )
            }
            isLimitText={true}
            maxLength={2}
            max={maxValue}
          />
          <Button
            disabled={inputValue ? inputValue > maxValue : true}
            isLoader={inProgress}
            text="Развернуть"
            type="submit"
          />
        </InputWrapper>
      </form>
      <ul className={styles.circleList}>
        {numbersArr.map((num, idx) => {
          return <Circle letter={num.toString()} key={idx} index={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};

export default FibonacciPage;
