import Link from "next/link";
import styles from "./page.module.css";
import StartButton from "@/components/startButton/StartButton";
import { getOverview } from "@/api/workouts/overview";

export default function WorkoutOverview() {
  const data = getOverview("0000-0000-0000-0000");
  if (!data) return <h1>loading...</h1>;
  return (
    <main>
      <div className={["card", styles.overview].join(" ")}>
        <div>
          <h1>{data.sessionName}</h1>
          <h2>Øvelser: {data.exercises.length} </h2>
        </div>
        <Link href="set">
          <StartButton text="Start" />
        </Link>
      </div>
      {data.exercises.map((e, i) => (
        <WorkoutCard key={i} exerciseName={e.exercise} sets={e.sets} />
      ))}
    </main>
  );
}

type WorkoutCardProps = {
  exerciseName: string;
  sets: number;
};
const WorkoutCard = ({ exerciseName, sets }: WorkoutCardProps) => {
  return (
    <div className="card">
      <h2>{exerciseName}</h2>
      <p>{sets} sett</p>
    </div>
  );
};
