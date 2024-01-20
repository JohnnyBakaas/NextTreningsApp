"use client";

import styles from "@/ui/protected/workoutPlaning/planleggMeso/PlanleggMeso.module.css";
import React, { useEffect, useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { ImCross } from "react-icons/im";
// @ts-ignore
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { cc } from "@/utils/classes";

export type Meso = {
  name: string;
  sessions: MesoSessionData[];
};

export type MesoSessionData = {
  name: string; // Push, Pull, Legs, Full Body, Upper, Lower, Custom
  exercises: Exercise[];
  day: DayIndex;
  mesoDayNumber: number;
  completed: boolean;
};

type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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

const days = [
  "Mandag",
  "Tirsdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lørdag",
  "Søndag",
];

const planleggMeso = () => {
  const [meso, setMeso] = useState<Meso>(data);
  const [mesoSession, setMesoSession] = useState(0);

  const addNewExercise = () => {
    setMeso((prevMeso) => {
      const newMeso = { ...prevMeso };
      const newSessions = [...newMeso.sessions];
      const currentSession = { ...newSessions[mesoSession] };
      const newExercises = [...currentSession.exercises];

      const newExercise: Exercise = {
        name: "New Exercise",
        sets: 2,
        completed: false,
      };

      newExercises.push(newExercise);

      currentSession.exercises = newExercises;

      newSessions[mesoSession] = currentSession;

      return { ...newMeso, sessions: newSessions };
    });
  };

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

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = e.target.value;
    setMeso((pre) => {
      const newMeso = { ...pre };
      newMeso.sessions[mesoSession].day = getDayIndex(day);
      return newMeso;
    });
  };

  return (
    <main>
      <h1>Planlegg Meso</h1>
      <div className={styles["wrapper"]}>
        <div className={styles["day-selecter-wrapper"]}>
          <h2>
            Økt: {mesoSession + 1}/{meso.sessions.length}
          </h2>
          <select
            value={getDay(meso.sessions[mesoSession].day)}
            onChange={handleDayChange}
            className={styles["select"]}
          >
            {days.map((day, i) => (
              <option key={day + i} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["session-wrapper"]}>
          <div className={styles["session-name-wrapper"]}>
            <input
              type="text"
              onChange={handleNameChange}
              value={meso.sessions[mesoSession].name}
              className={styles["input-h2"]}
            />
            <button
              className={cc([styles["svg-button"], styles["svg-button-h2"]])}
            >
              <ImCross />
            </button>
          </div>

          <div className={styles["exercises-constainer"]}>
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
            className={cc([styles["add-exercise-button"]])}
            onClick={() => addNewExercise()}
          >
            Legg til en ny øvelse
          </button>

          <div className={styles["sesion-nav-wrapper"]}>
            <button
              onClick={() =>
                setMesoSession((pre) => (pre == 0 ? pre : pre - 1))
              }
              className={cc([styles["svg-button"], styles["svg-button-h2"]])}
            >
              {mesoSession == 0 ? (
                <AiOutlineStop className={styles.red} />
              ) : (
                <FaArrowLeft />
              )}
            </button>

            <div className={styles["text-button-wrapper"]}>
              <button
                onClick={() => addNewSession()}
                className={cc([
                  styles["session-nav-text"],
                  styles["sesion-nav-wrapper-button"],
                ])}
              >
                Legg til ny økt
              </button>

              <button
                onClick={() => copySession()}
                className={cc([
                  styles["session-nav-text"],
                  styles["sesion-nav-wrapper-button"],
                ])}
              >
                Kopier økt
              </button>
            </div>

            <button
              onClick={() =>
                setMesoSession((pre) =>
                  pre == meso.sessions.length - 1 ? pre : pre + 1
                )
              }
              className={cc([styles["svg-button"], styles["svg-button-h2"]])}
            >
              {mesoSession == meso.sessions.length - 1 ? (
                <AiOutlineStop className={styles.red} />
              ) : (
                <FaArrowRight />
              )}
            </button>
          </div>
        </div>
      </div>
      <button>
        <h1>Lagre økt</h1>
      </button>
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
  const [name, setName] = useState(exercise.name);

  const handleSetsChange = (newSets: number) => {
    if (newSets < 1 || newSets > 10) return;
    // @ts-ignore
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

  const handleNameOnBlure = () => {
    // @ts-ignore
    setMeso((prevMeso: Meso) => {
      const newSessions = prevMeso.sessions.map(
        (session: MesoSessionData, sIdx: number) =>
          sIdx === mesoSession
            ? {
                ...session,
                exercises: session.exercises.map((ex: Exercise, eIdx: number) =>
                  eIdx === index ? { ...ex, name: name } : ex
                ),
              }
            : session
      );
      return { ...prevMeso, sessions: newSessions };
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className={styles["exercise-wrapper"]}>
      <button
        onClick={() => removeExercise(index)}
        className={styles["svg-button"]}
      >
        <ImCross />
      </button>

      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        onBlur={() => handleNameOnBlure()}
        className={styles["input-h3"]}
      />

      <div className={styles["arrow-button-wrapper"]}>
        <button
          className={styles["svg-button"]}
          onClick={() => handleSetsChange(exercise.sets - 1)}
          disabled={exercise.sets <= 1}
        >
          {exercise.sets <= 1 ? (
            <AiOutlineStop className={styles.red} />
          ) : (
            <FaArrowLeft />
          )}
        </button>
        <h2>{exercise.sets}</h2>
        <button
          className={styles["svg-button"]}
          onClick={() => handleSetsChange(exercise.sets + 1)}
        >
          {exercise.sets >= 10 ? (
            <AiOutlineStop className={styles.red} />
          ) : (
            <FaArrowRight />
          )}
        </button>
      </div>
    </div>
  );
};

const getDay = (dayIndex: number) => {
  if (days[dayIndex]) return days[dayIndex];
  return days[0];
};

const getDayIndex = (day: string) => {
  const dayIndex = days.indexOf(day);
  if (dayIndex == -1) return 0 as DayIndex;
  return dayIndex as DayIndex;
};
