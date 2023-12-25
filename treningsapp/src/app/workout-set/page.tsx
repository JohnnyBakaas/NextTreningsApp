import StartButton from "@/components/startButton/StartButton";
import styles from "./page.module.css";

export default function WorkoutSet() {
  return (
    <main className={styles.main}>
      <div className="card">
        <div className={styles.flexer}>
          <h1>Benk</h1>
          <h2>Set 1/3</h2>
        </div>
        <div className={styles.flexer}>
          <h2>Reps:</h2>
          <h2>6</h2>
        </div>
        <div className={styles.flexer}>
          <StartButton text="<-" secColor />
          <StartButton text="->" />
        </div>
      </div>
    </main>
  );
}
