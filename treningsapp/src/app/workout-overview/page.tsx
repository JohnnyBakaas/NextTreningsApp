import styles from "./page.module.css";
import StartButton from "@/components/startButton/StartButton";

export default function WorkoutOverview() {
  return (
    <main>
      <div className={["card", styles.overview].join(" ")}>
        <div>
          <h1>Push</h1>
          <h2>Øvelser: 6</h2>
        </div>
        <StartButton text="Start" />
      </div>
      <WorkoutCard />
      <WorkoutCard />
      <WorkoutCard />
    </main>
  );
}

const WorkoutCard = () => {
  return (
    <div className="card">
      <h2>Benk</h2>
      <p>3 sett</p>
    </div>
  );
};
