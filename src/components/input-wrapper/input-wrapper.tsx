import React, {FC, ReactNode} from 'react';
import styles from './input-wrapper.module.css';

const InputWrapper: FC<{children: ReactNode}> = ({children}) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default InputWrapper;
