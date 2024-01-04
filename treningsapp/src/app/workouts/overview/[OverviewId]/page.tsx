import Link from "next/link";
import styles from "@/ui/page.module.css";
import StartButton from "@/components/startButton/StartButton";
import { getOverview } from "@/api/workouts/overview";

export default function WorkoutOverview({
  params,
}: {
  params: { OverviewId: string };
}) {
  console.log(params.OverviewId);
  // const data = getOverview("0000-0000-0000-0000");
  const data = getOverview(params.OverviewId);
  if (!data)
    return (
      <div className="card">
        <h1>loading...</h1>
      </div>
    );
  return (
    <main>
      <div className={styles.overview}>
        <div>
          <h1>{data.sessionName}</h1>
          <h2>Øvelser: {data.exercises.length} </h2>
        </div>
        <StartButton text="Endre" secColor />
      </div>

      {data.exercises.map((e, i) => (
        <WorkoutCard key={i} exerciseName={e.exercise} sets={e.sets} />
      ))}
      {data.exercises.map((e, i) => (
        <WorkoutCard key={i} exerciseName={e.exercise} sets={e.sets} />
      ))}
      {data.exercises.map((e, i) => (
        <WorkoutCard key={i} exerciseName={e.exercise} sets={e.sets} />
      ))}
      {data.exercises.map((e, i) => (
        <WorkoutCard key={i} exerciseName={e.exercise} sets={e.sets} />
      ))}

      <nav className={styles.nav}>
        <Link href="/">
          <StartButton text="<--" secColor />
        </Link>

        <Link href="/workouts/set/f">
          <StartButton text="Start" />
        </Link>
      </nav>
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
