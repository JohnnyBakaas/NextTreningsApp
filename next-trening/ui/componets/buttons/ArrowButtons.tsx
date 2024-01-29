import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import styles from "./ArrowButtons.module.css";
import { cc } from "@/utils/classes";
import { AiOutlineStop } from "react-icons/ai";

type ArrowButtonProps = {
  onClick?: () => any;
  classNames?: string | string[];
  size?: "medium" | "large";
  disabled?: boolean;
};

type ButtonWrapperProps = {
  children: React.ReactNode;
};

const ButtonWrapper = ({
  children,
  onClick,
  classNames,
  size,
  disabled,
}: ArrowButtonProps & ButtonWrapperProps) => {
  const classNameArray = [styles.button];
  if (typeof classNames === "string") classNameArray.push(classNames);
  if (Array.isArray(classNames)) classNameArray.push(...classNames);
  if (size) classNameArray.push(styles[size]);

  return (
    <button
      className={cc(classNameArray)}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? <AiOutlineStop /> : children}
    </button>
  );
};

export const ArrowButtonLeft = ({
  onClick,
  classNames,
  size,
  disabled,
}: ArrowButtonProps) => (
  <ButtonWrapper
    onClick={onClick}
    classNames={classNames}
    size={size}
    disabled={disabled}
  >
    <FaArrowLeft />
  </ButtonWrapper>
);

export const ArrowButtonRight = ({
  onClick,
  classNames,
  size,
  disabled,
}: ArrowButtonProps) => (
  <ButtonWrapper
    onClick={onClick}
    classNames={classNames}
    size={size}
    disabled={disabled}
  >
    <FaArrowRight />
  </ButtonWrapper>
);

export const ArrowButtonUp = ({
  onClick,
  classNames,
  size,
  disabled,
}: ArrowButtonProps) => (
  <ButtonWrapper
    onClick={onClick}
    classNames={classNames}
    size={size}
    disabled={disabled}
  >
    <FaArrowUp />
  </ButtonWrapper>
);

export const ArrowButtonDown = ({
  onClick,
  classNames,
  size,
  disabled,
}: ArrowButtonProps) => (
  <ButtonWrapper
    onClick={onClick}
    classNames={classNames}
    size={size}
    disabled={disabled}
  >
    <FaArrowDown />
  </ButtonWrapper>
);
