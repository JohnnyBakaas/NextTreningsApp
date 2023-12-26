import styles from "./SmallRoundButton.module.css";

type SmallRoundButtonProps = {
  text: string;
  onClick?: (f: any) => any;
};

export default function SmallRoundButton({ text }: SmallRoundButtonProps) {
  return (
    <button className={styles.button}>
      <h3>{text}</h3>
    </button>
  );
}
