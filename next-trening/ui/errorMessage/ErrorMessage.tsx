import styles from "./ErrorMessage.module.css";
import { IoIosWarning } from "react-icons/io";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.wrapper}>
      <IoIosWarning />
      <h3>{message}</h3>
    </div>
  );
};
