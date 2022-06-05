import React, {useState, useEffect} from 'react';
import {SolutionLayout} from '../../components/ui/solution-layout/solution-layout';
import {RadioInput} from '../../components/ui/radio-input/radio-input';
import {Button} from '../../components/ui/button/button';
import {Column} from '../../components/ui/column/column';
import {ElementStates} from '../../types/element-states';
import {Direction} from '../../types/direction';
import {TBar} from '../../types/types';
import {getNumber} from '../../utils/utils';
import styles from './sorting.module.css';
import {selectionSort, bubbleSort} from './utils';

const SortingPage: React.FC = () => {
  const [inProgress, setInProgress] = useState(false);
  const [ascendingRunning, setAscendingRunning] = useState(false);
  const [descendingRunning, setDescendingRunning] = useState(false);
  const [checked, setChecked] = useState<'selection' | 'bubble'>('selection');
  const [bars, setBars] = useState<TBar[]>([]);

  const getRandomArr = () => {
    const size = Math.random() * (17 - 3) + 3;
    const arr: TBar[] = Array.from({length: size}, () => ({
      num: getNumber(),
      state: ElementStates.Default
    }));
    setBars([...arr]);
  };

  useEffect(() => {
    getRandomArr();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.radioWrapper}>
            <RadioInput
              disabled={inProgress}
              checked={checked === 'selection'}
              onChange={() => setChecked('selection')}
              value="selection"
              label="Выбор"
            />
            <RadioInput
              disabled={inProgress}
              checked={checked === 'bubble'}
              onChange={() => setChecked('bubble')}
              value="bubble"
              label="Пузырёк"
            />
          </div>
          <div className={styles.buttonsWrapper}>
            <Button
              sorting={Direction.Ascending}
              disabled={inProgress}
              isLoader={ascendingRunning}
              text="По возрастанию"
              type="submit"
              onClick={() =>
                checked === 'selection'
                  ? selectionSort(
                      'ascending',
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setBars,
                      bars
                    )
                  : bubbleSort(
                      'ascending',
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setBars,
                      bars
                    )
              }
            />
            <Button
              sorting={Direction.Descending}
              disabled={inProgress}
              isLoader={descendingRunning}
              text="По убыванию"
              type="submit"
              onClick={() =>
                checked === 'selection'
                  ? selectionSort(
                      'descending',
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setBars,
                      bars
                    )
                  : bubbleSort(
                      'descending',
                      setInProgress,
                      setAscendingRunning,
                      setDescendingRunning,
                      setBars,
                      bars
                    )
              }
            />
          </div>
          <Button
            disabled={inProgress}
            isLoader={false}
            text="Новый массив"
            type="submit"
            onClick={() => getRandomArr()}
          />
        </div>
        <ul className={styles.columnList}>
          {bars.map((bar, idx) => {
            return <Column index={bar.num} state={bar.state} key={idx} />;
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};

export default SortingPage;
