import React, {FC, memo, ReactNode, useMemo} from 'react';
import includes from 'lodash/includes';
import clsx from 'clsx';
import {ButtonVariant} from 'types/general';
import Spinner from '../loading/Spinner';

interface Props {
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  titleClassName?: string;
  isLoading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  icon?: ReactNode;
  leftIcon?: ReactNode;
  width?: string;
  iconOnly?: boolean;
}
const Button: FC<Props> = ({
  title,
  icon,
  type = 'button',
  className,
  titleClassName,
  isLoading,
  leftIcon,
  disabled,
  onClick,
  backgroundColor,
  variant = 'primary',
  width = 'w-full sm:w-fit',
  iconOnly = false
}) => {
  const clx = useMemo(
    () =>
      clsx(
        'px-4 min-h-[2.5rem] min-w-fit text-center text-sm font-medium text-body justify-center border-2 transition-all duration-300 my-2 flex shrink-0 items-center rounded-lg',
        className,
        {'bg-red-500 border-transparent': variant === 'danger' && !disabled},
        {'!text-red-500 border-transparent bg-transparent': variant === 'danger-ghost' && !disabled},
        {'!border-0 bg-transparent': variant === 'ghost' && !disabled},
        {'!text-red-500 border-red-500': variant === 'danger-outline' && !disabled},
        {'!bg-primary !border-transparent': variant === 'primary' && !disabled},
        {'!text-primary !border-primary': variant === 'primary-outline' && !disabled},
        {'bg-secondary border-transparent': variant === 'secondary' && !disabled},
        {'!text-secondary-dark border-secondary-dark': variant === 'secondary-outline' && !disabled},
        {'!text-zinc-500/80 border-gray-200': variant === 'muted-outline' && !disabled},
        {'cursor-not-allowed': isLoading || disabled},
        {'border-transparent bg-gray-200 ': disabled && !includes(variant, 'outline')},
        {'text-zinc-500/80 border-gray-200': disabled && includes(variant, 'outline')},
        {'opacity-80': isLoading},
        {[width]: width},
        {backgroundColor}
      ),
    [className, backgroundColor, variant, width, disabled, isLoading]
  );

  const spinnerColor = useMemo(
    () =>
      clsx(
        {'fill-body': variant === 'primary' || variant === 'secondary' || variant === 'danger'},
        {'fill-primary': variant === 'primary-outline'},
        {'fill-red-500': variant === 'danger-outline'},
        {'fill-secondary': variant === 'secondary-outline'},
        {'fill-gray-500': variant === 'muted-outline'}
      ),
    [variant]
  );

  if (iconOnly)
    return (
      <button type={type} onClick={onClick} className={clx} disabled={isLoading || disabled}>
        {icon}
      </button>
    );
  return (
    <button type={type} onClick={onClick} className={clx} disabled={isLoading || disabled}>
      {icon && !isLoading && <span className="pl-1">{icon}</span>}
      {isLoading && <Spinner size="!w-5 !h-5" className="ml-2 !p-0" fill={spinnerColor} />}
      <span className={clsx('whitespace-nowrap', titleClassName)}>{title}</span>
      {leftIcon && !isLoading && <span className="pr-1">{leftIcon}</span>}
    </button>
  );
};

export default memo(Button);
