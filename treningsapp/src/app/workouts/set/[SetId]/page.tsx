import StartButton from "@/components/startButton/StartButton";
import styles from "./page.module.css";
import SmallRoundButton from "@/components/smallRoundButton/SmallRoundButton";
import DropDownVideo from "@/components/dropDownVideo/DropDownVideo";
import { getSet } from "@/api/workouts/set";

export default function WorkoutSet({ params }: { params: { SetId: string } }) {
  const data = getSet(params.SetId);
  if (!data) return <h1>Nei!</h1>;
  return (
    <main className={styles.main}>
      <div className="card">
        <div className={styles.flexer}>
          <h1> {data.exercise} </h1>
          <h2 style={{ textAlign: "right" }}>Set 1/3</h2>
        </div>
        <DropDownVideo />
      </div>
      <div className="card">
        <div className={styles.flexer}>
          <h2>Vekt:</h2>
          <div className={styles.flexer}>
            <SmallRoundButton text="<-" />
            <h2 className={styles.numbers}>60</h2>
            <SmallRoundButton text="->" />
          </div>
        </div>
        <div className={styles.flexer}>
          <h2>Reps:</h2>
          <div className={styles.flexer}>
            <SmallRoundButton text="<-" />
            <h2 className={styles.numbers}>6</h2>
            <SmallRoundButton text="->" />
          </div>
        </div>
        <div className={styles.flexer}>
          <h2>RIR:</h2>
          <div className={styles.flexer}>
            <SmallRoundButton text="<-" />
            <h2 className={styles.numbers}>2</h2>
            <SmallRoundButton text="->" />
          </div>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.flexer}>
          <StartButton text="<-" secColor />
          <StartButton text="->" />
        </div>
      </div>
    </main>
  );
}
