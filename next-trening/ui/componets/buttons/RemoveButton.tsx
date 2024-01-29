import { ImCross } from "react-icons/im";
import styles from "./RemoveButton.module.css";
import { cc } from "@/utils/classes";
import Spinner from "../spinner/Spinner";

type ArrowButtonProps = {
  onClick?: () => void;
  classNames?: string | string[];
  size?: "medium" | "large";
  loading?: boolean;
};

export const RemoveButton = ({
  onClick,
  classNames,
  size,
  loading,
}: ArrowButtonProps) => {
  const classNameArray = [styles.button];
  if (typeof classNames === "string") classNameArray.push(classNames);
  if (Array.isArray(classNames)) classNameArray.push(...classNames);
  if (size) classNameArray.push(styles[size]);

  return (
    <button className={cc(classNameArray)} onClick={onClick} disabled={loading}>
      {loading ? <Spinner /> : <ImCross />}
    </button>
  );
};
