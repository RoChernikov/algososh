import React, {FC, ReactNode} from 'react';
import styles from './input-wrapper.module.css';

const InputWrapper: FC<{children: ReactNode; maxWidth?: number}> = ({
  children,
  maxWidth = 567
}) => {
  return (
    <div className={styles.wrapper} style={{maxWidth: maxWidth}}>
      {children}
    </div>
  );
};

export default InputWrapper;
