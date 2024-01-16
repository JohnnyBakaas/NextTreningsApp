"use client";

import styles from "@/ui/protected/workoutPlaning/planleggMeso/PlanleggMeso.module.css";
import React, { useEffect, useState } from "react";
// @ts-ignore
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
  const [mesoSession, setMesoSession] = useState(0);

  const addNewExercise = () => {
    setMeso((prevMeso) => {
      // Create a deep copy of the current meso state to avoid direct mutation
      const newMeso = { ...prevMeso };
      const newSessions = [...newMeso.sessions];
      const currentSession = { ...newSessions[mesoSession] };
      const newExercises = [...currentSession.exercises];

      // Create a new exercise object
      const newExercise: Exercise = {
        name: "New Exercise",
        sets: 2,
        completed: false,
      };

      // Add the new exercise to the copied exercises array
      newExercises.push(newExercise);

      // Update the current session with the new exercises array
      currentSession.exercises = newExercises;

      // Update the sessions array with the updated session
      newSessions[mesoSession] = currentSession;

      // Return the new meso state with the updated sessions array
      return { ...newMeso, sessions: newSessions };
    });
  };

  // q: why dose this trigrer twice when the onClick onyl trigers once?

  const addNewSession = () => {
    const newIndex = meso.sessions.length;
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

    setMeso((pre) => {
      return { ...pre, sessions: [...pre.sessions, newSession] };
    });

    setMesoSession(newIndex);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeso((prevMeso) => {
      const newSessions = prevMeso.sessions.map((session, idx) =>
        idx === mesoSession ? { ...session, name: e.target.value } : session
      );
      return { ...prevMeso, sessions: newSessions };
    });
  };

  const copySession = () => {
    const newIndex = meso.sessions.length;
    const newSession: MesoSessionData = JSON.parse(
      JSON.stringify(meso.sessions[mesoSession])
    );

    setMeso((pre) => {
      return { ...pre, sessions: [...pre.sessions, newSession] };
    });

    console.log(meso.sessions);
    setMesoSession(newIndex);
  };

  const removeExercise = (index: number) => {
    setMeso((prevMeso) => {
      console.log("Previous meso state:", prevMeso);

      const newMeso = { ...prevMeso };
      const newSessions = newMeso.sessions.map((session, sessionIndex) => {
        if (sessionIndex === mesoSession) {
          return {
            ...session,
            exercises: session.exercises.filter((_, idx) => idx !== index),
          };
        }
        return session;
      });

      const updatedMeso = { ...newMeso, sessions: newSessions };
      console.log("Updated meso state:", updatedMeso);
      return updatedMeso;
    });
  };

  return (
    <main>
      <h1>Planlegg Meso</h1>
      <div>
        <h2>
          Økt: {mesoSession + 1}/{meso.sessions.length} -{" "}
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
            {meso.sessions[mesoSession].exercises.map((exercise, index) => (
              <Exercise
                key={`${exercise.name}-${index}`}
                removeExercise={removeExercise}
                mesoSession={mesoSession}
                exercise={exercise}
                setMeso={setMeso}
                meso={meso}
                index={index}
              />
            ))}
          </div>

          <button
            className={styles["add-exercise-button"]}
            onClick={() => addNewExercise()}
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
  const handleSetsChange = (newSets: number) => {
    setMeso((prevMeso: Meso) => {
      const newSessions = prevMeso.sessions.map(
        (session: MesoSessionData, sIdx: number) =>
          sIdx === mesoSession
            ? {
                ...session,
                exercises: session.exercises.map((ex: Exercise, eIdx: number) =>
                  eIdx === index ? { ...ex, sets: newSets } : ex
                ),
              }
            : session
      );
      return { ...prevMeso, sessions: newSessions };
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeso((prevMeso: Meso) => {
      const newName = e.target.value;
      const newSessions = prevMeso.sessions.map(
        (session: MesoSessionData, sIdx: number) =>
          sIdx === mesoSession
            ? {
                ...session,
                exercises: session.exercises.map((ex: Exercise, eIdx: number) =>
                  eIdx === index ? { ...ex, name: newName } : ex
                ),
              }
            : session
      );
      return { ...prevMeso, sessions: newSessions };
    });
  };

  return (
    <div className={styles["exercise-wrapper"]}>
      <button onClick={() => removeExercise(index)}> X </button>

      <input
        type="text"
        value={exercise.name}
        onChange={handleNameChange}
        className={styles["input-h2"]}
      />

      <div className={styles["arrow-button-wrapper"]}>
        <button
          className={styles["arrow-button"]}
          onClick={() => handleSetsChange(exercise.sets - 1)}
          disabled={exercise.sets <= 1}
        >
          <FaArrowLeft />
        </button>
        <h2>{exercise.sets}</h2>
        <button
          className={styles["arrow-button"]}
          onClick={() => handleSetsChange(exercise.sets + 1)}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

const day = (dayIndex: number) => {
  const days = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];
  return days[dayIndex];
};
