import { cc } from "@/utils/classes";
import styles from "./BigButton.module.css";

type BigButtonProps = {
  onClick?: () => void;
  size: "h1" | "h2" | "h3";
  children: React.ReactNode;
};

const BigButton = ({ onClick, size, children }: BigButtonProps) => {
  return (
    <button
      onClick={() => (onClick ? onClick() : null)}
      className={cc([styles["button"], styles[size]])}
    >
      {children}
    </button>
  );
};

export default BigButton;
