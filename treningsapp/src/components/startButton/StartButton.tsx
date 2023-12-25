import styles from "./StartButton.module.css";

type StartButtonProps = {
  text: string;
  secColor?: boolean;
  onClick?: () => any;
};

export default function StartButton({
  text,
  secColor,
  onClick,
}: StartButtonProps) {
  return (
    <button
      className={
        !secColor
          ? styles["start-button"]
          : [styles["start-button"], styles.qua].join(" ")
      }
      onClick={onClick}
    >
      <h2>{text}</h2>
    </button>
  );
}
