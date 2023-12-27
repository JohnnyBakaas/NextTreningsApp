import Link from "next/link";
import styles from "./page.module.css";

export default function Workouts() {
  const workoutList: WorkoutProps[] = [
    {
      name: "Push",
      date: new Date(),
    },
    {
      name: "Pull",
      date: new Date(new Date(2000000000000)),
    },
  ];
  return (
    <main className={styles.main}>
      <div className={["card", styles.workout].join(" ")}>
        <h1>Uke</h1>
        <h1>1 / 5</h1>
      </div>
      {workoutList.map((e, i) => (
        <Workout key={i} name={e.name} date={e.date} />
      ))}
    </main>
  );
}

export type WorkoutProps = {
  name: string;
  date: Date;
};

const Workout = ({ name, date }: WorkoutProps) => {
  const todayNorwegianDate = new Date().toLocaleDateString("no-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const norwegianDate = date.toLocaleDateString("no-NO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <Link
      href={"workouts/overview"}
      className={[styles.workout, "card"].join(" ")}
    >
      <div>
        <h1>{name}</h1>
        <p>{norwegianDate}</p>
      </div>
      {todayNorwegianDate == norwegianDate ? (
        <button className={styles["start-button"]}>
          <h2>Start</h2>
        </button>
      ) : (
        <button className={[styles["start-button"], styles["today"]].join(" ")}>
          <h2>Åpne</h2>
        </button>
      )}
    </Link>
  );
};
