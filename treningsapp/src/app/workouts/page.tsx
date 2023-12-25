import styles from "./page.module.css";

export default function Workouts() {
  const workoutList: WorkoutProps[] = [
    {
      name: "Push",
      date: new Date(),
    },
    {
      name: "Pull",
      date: new Date(new Date(1)),
    },
  ];
  return (
    <main className={styles.main}>
      {workoutList.map((e, i) => (
        <Workout key={i} name={e.name} date={e.date} />
      ))}
    </main>
  );
}

type WorkoutProps = {
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
    <div className={[styles.workout, "card"].join(" ")}>
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
    </div>
  );
};
