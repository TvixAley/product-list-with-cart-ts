import type { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.css';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button({ className, type = 'button', ...props }: ButtonProps) {
  const classes = [styles.button, 'text-preset-3', className]
    .filter(Boolean)
    .join(' ');

  return <button type={type} className={classes} {...props} />;
}
