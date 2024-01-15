"use client";

import styles from "@/ui/protected/workoutPlaning/planleggMeso/PlanleggMeso.module.css";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export type Meso = {
  name: string;
  sessions: MesoSessionData[];
};

export type MesoSessionData = {
  name: string; // Push, Pull, Legs, Full Body, Upper, Lower, Custom
  exercises: Exercise[];
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  mesoDayNumber: number;
  completed: boolean;
};

export type Exercise = {
  name: string;
  sets: number;
  completed: boolean;
};

export type Set = {
  reps: number;
  weight: number;
  rir: number;
  notes: string;
};

const data: Meso = {
  name: "Meso 1",
  sessions: [
    {
      name: "Push",
      exercises: [
        {
          name: "Bench Press",
          sets: 2,
          completed: false,
        },
        {
          name: "Incline Bench Press",
          sets: 2,
          completed: false,
        },
      ],
      day: 0,
      mesoDayNumber: 1,
      completed: false,
    },
    {
      name: "Pull",
      exercises: [
        {
          name: "Lat pulldown",
          sets: 2,
          completed: false,
        },
      ],
      day: 1,
      mesoDayNumber: 1,
      completed: false,
    },
  ],
};

const planleggMeso = () => {
  const [meso, setMeso] = useState<Meso>(data);
  console.log(meso);
  const [mesoSession, setMesoSession] = useState(0);

  const addNewExercise = () => {
    const newExercise: Exercise = {
      name: "New Exercise",
      sets: 2,
      completed: false,
    };

    meso.sessions[mesoSession].exercises.push(newExercise);
    setMeso({ ...meso });
  };

  const addNewSession = () => {
    const newSession: MesoSessionData = {
      name: "Ny økt",
      exercises: [
        {
          name: "Ny øvelse",
          sets: 2,
          completed: false,
        },
      ],
      day: 0,
      mesoDayNumber: 1,
      completed: false,
    };

    meso.sessions.push(newSession);

    setMeso({ ...meso });
    console.log(meso.sessions);
    setMesoSession(meso.sessions.length - 1);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    meso.sessions[mesoSession].name = e.target.value;
    setMeso({ ...meso });
  };

  const copySession = () => {
    const newSession: MesoSessionData = JSON.parse(
      JSON.stringify(meso.sessions[mesoSession])
    );

    meso.sessions.push(newSession);

    setMeso({ ...meso });
    console.log(meso.sessions);
    setMesoSession(meso.sessions.length - 1);
  };

  const removeExercise = (index: number) => {
    setMeso((prevMeso) => {
      const newMeso = { ...prevMeso };
      const newSessions = [...newMeso.sessions];
      const newSession = { ...newSessions[mesoSession] };
      newSession.exercises = newSession.exercises.filter(
        (_, idx) => idx !== index
      );
      newSessions[mesoSession] = newSession;
      return { ...newMeso, sessions: newSessions };
    });
  };

  return (
    <main>
      <h1>Planlegg Meso</h1>
      <div>
        <h2>
          Økt: {mesoSession + 1}/{data.sessions.length} -{" "}
          {day(meso.sessions[mesoSession].day)}
        </h2>
        <select name="" id="">
          {meso.sessions.map((session, i) => (
            <option
              key={meso.sessions[mesoSession].name + i}
              value={meso.sessions[mesoSession].name}
            >
              {meso.sessions[mesoSession].name}
            </option>
          ))}
        </select>
        <div>
          <div>
            <input
              type="text"
              onChange={handleNameChange}
              value={meso.sessions[mesoSession].name}
              className={styles["input-h1"]}
            />
            <h1>X</h1>
          </div>
          <div>
            {meso.sessions[mesoSession].exercises.map((exercise, i) => (
              <Exercise
                removeExercise={removeExercise}
                mesoSession={mesoSession}
                key={`${exercise.name + " " + i}`}
                exercise={exercise}
                setMeso={setMeso}
                meso={meso}
                index={i}
              />
            ))}
          </div>

          <button
            className={styles["add-exercise-button"]}
            onClick={addNewExercise}
          >
            Legg til en ny øvelse
          </button>

          <div>
            <button
              onClick={() =>
                setMesoSession((pre) => (pre == 0 ? pre : pre - 1))
              }
            >
              <h2>{mesoSession == 0 ? "NEI" : <FaArrowLeft />}</h2>
            </button>
            <button onClick={() => addNewSession()}>
              <h2>Legg til ny økt</h2>
            </button>
            <button onClick={() => copySession()}>
              <h2>Kopier økt</h2>
            </button>
            <button
              onClick={() =>
                setMesoSession((pre) =>
                  pre == meso.sessions.length - 1 ? pre : pre + 1
                )
              }
            >
              <h2>
                {mesoSession == meso.sessions.length - 1 ? (
                  "NEI"
                ) : (
                  <FaArrowRight />
                )}
              </h2>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default planleggMeso;

type ExerciseProps = {
  removeExercise: (index: number) => void;
  exercise: Exercise;
  setMeso: (pre: Meso) => void;
  meso: Meso;
  mesoSession: number;
  index: number;
};

const Exercise = ({
  exercise,
  setMeso,
  meso,
  mesoSession,
  removeExercise,
  index,
}: ExerciseProps) => {
  const [exerciseSets, setExerciseSets] = useState(exercise.sets);
  const [exerciseName, setExerciseName] = useState(exercise.name);

  const handleMesoChange = () => {
    setMeso({ ...meso });
    console.log(meso);
  };

  const changeSets = (direction: "up" | "down") => {
    if (direction == "up") {
      exercise.sets++;
    }
    if (direction == "down") {
      if (exercise.sets <= 1) return;
      exercise.sets--;
    }
    setExerciseSets(exercise.sets);

    handleMesoChange();
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
    exercise.name = e.target.value;
  };

  return (
    <div className={styles["exercise-wrapper"]}>
      <button onClick={() => removeExercise(index)}> X</button>

      <input
        type="text"
        value={exerciseName}
        onChange={changeName}
        className={styles["input-h2"]}
      />

      <div className={styles["arrow-button-wrapper"]}>
        <button
          className={styles["arrow-button"]}
          onClick={() => changeSets("down")}
        >
          <FaArrowLeft />
        </button>
        <h2>{exerciseSets}</h2>
        <button
          className={styles["arrow-button"]}
          onClick={() => changeSets("up")}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

const day = (dayIndex: number) => {
  const days = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
  return days[dayIndex];
};
