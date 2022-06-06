import React, {useState, FormEvent, useMemo} from 'react';
import {SolutionLayout} from '../../components/ui/solution-layout/solution-layout';
import InputWrapper from '../../components/input-wrapper/input-wrapper';
import {Input} from '../../components/ui/input/input';
import {Button} from '../../components/ui/button/button';
import {Circle} from '../../components/ui/circle/circle';
import {StackAlgorithm} from './utils';
import {ICircleElement} from '../../types/types';
import {ElementStates} from '../../types/element-states';
import {setDelay} from '../../utils/utils';
import {SHORT_DELAY_IN_MS} from '../../constants/delays';
import {setElementsWithDelay} from '../../utils/utils';
import styles from './stack.module.css';

const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [elements, setElements] = useState<ICircleElement[]>([]);
  const [isPushing, setIsPushing] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const stack = useMemo(() => new StackAlgorithm<string>(), []); // экземпляр стэка

  // ***********************ДОБАВЛЕНИЕ***********************
  const pushElement = async () => {
    setIsPushing(true);
    setInputValue('');
    // Добавляем элеммент в массив, измененный массив сохраняем в стейт
    stack.push(inputValue);
    // Сбрасываем состояние всех элементов в стейте
    elements.forEach(el => {
      el.state = ElementStates.Default;
      el.head = '';
    });
    // Достаем последний элемент из стека и добавляем его в стейт
    const element = stack.peak();
    elements.push({
      char: element ? element : '',
      state: ElementStates.Default
    });
    await setElementsWithDelay(elements, setElements, true);
    // Меняем стейт головы и тобавляем метку 'top'
    const headIdx = elements.length - 1;
    elements[headIdx].head = 'top';
    elements[headIdx].state = ElementStates.Changing;
    await setElementsWithDelay(elements, setElements, true);
    setIsPushing(false);
  };

  // ***********************УДАЛЕНИЕ***********************
  const popElement = async () => {
    setIsPopping(true);
    // Удаляем элемент из стека
    stack.pop();
    if (stack.getSize()) {
      elements.pop();
      setElements([...elements]);
      await setDelay(SHORT_DELAY_IN_MS);
      const headIdx = elements.length - 1;
      elements[headIdx].state = ElementStates.Changing;
      elements[headIdx].head = 'top';
      setElements([...elements]);
    } else {
      // если стек пустой, то рендерим пустой массив
      setElements([]);
    }
    setIsPopping(false);
  };

  // ***********************ОЧИСТКА***********************
  const clear = async () => {
    stack.clear();
    setElements([]);
  };

  return (
    <SolutionLayout title="Стек">
      <form
        onSubmit={evt => {
          evt.preventDefault();
          pushElement();
        }}>
        <InputWrapper maxWidth={829}>
          <Input
            extraClass={styles.input}
            disabled={isPushing || isPopping}
            placeholder="Введите текст"
            min={1}
            maxLength={4}
            value={inputValue || ''}
            onChange={(evt: FormEvent<HTMLInputElement>) =>
              setInputValue(evt.currentTarget.value)
            }
            isLimitText={true}
          />
          <Button
            disabled={!inputValue || isPopping || elements.length > 12}
            isLoader={isPushing}
            text="Добавить"
            type="submit"
          />
          <Button
            extraClass={styles.deleteBtn}
            isLoader={isPopping}
            disabled={!elements.length || isPushing}
            onClick={() => popElement()}
            text="Удалить"
          />
          <Button
            disabled={!elements.length || isPushing || isPopping}
            text="Очистить"
            onClick={() => clear()}
          />
        </InputWrapper>
      </form>
      <ul className={styles.circleList}>
        {elements.map((char, idx) => {
          return (
            <Circle
              state={char.state}
              letter={char.char}
              index={idx}
              key={idx}
              head={char.head}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};

export default StackPage;
