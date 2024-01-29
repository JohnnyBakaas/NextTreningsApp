"use client";

import { getExercises } from "@/actions/getMeso/getExercises";
import { getWorkoutSessions } from "@/actions/getMeso/getWorkoutSessions";
import { modifyExercise } from "@/actions/modifyMeso/modifyExercise";
import {
  modifyMesoName,
  modifyMesoWeekLength,
} from "@/actions/modifyMeso/modifyMeso";
import {
  modifySessionDayIndex,
  modifySessionName,
} from "@/actions/modifyMeso/modifySession";
import { makeNewExercise } from "@/actions/newMeso/makeNewExercise";
import { makeNewWorkoutSession } from "@/actions/newMeso/makeNewWorkoutSession";
import { removeExercise } from "@/actions/removeMeso/removeExercise";
import {
  ArrowButtonDown,
  ArrowButtonLeft,
  ArrowButtonRight,
  ArrowButtonUp,
} from "@/ui/componets/buttons/ArrowButtons";
import { RemoveButton } from "@/ui/componets/buttons/RemoveButton";
import { Exercise, Meso, WorkoutSession } from "@prisma/client";
import { useEffect, useState } from "react";
import styles from "./PlanleggMeso.module.css";
import { days, getDay, getDayIndex } from "@/utils/days";

type PlanleggMesoTempProps = {
  meso: Meso;
};

const PlanleggMesoTemp = ({ meso }: PlanleggMesoTempProps) => {
  const [mesoName, setMesoName] = useState(meso.name);
  const [weekLength, setWeekLength] = useState(meso.weekLength);

  const [sessions, setSessions] = useState<WorkoutSession[] | null>(null);
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(
    null
  );

  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  useEffect(() => {
    const getDataOnStart = async () => {
      const newSessions = await getWorkoutSessions(meso);
      if (!newSessions) return;
      setSessions(newSessions);
      setCurrentSession(newSessions[0]);
      console.log("sessions", sessions);
    };
    getDataOnStart();
  }, []);

  useEffect(() => {
    const uppdateExercises = async () => {
      if (!currentSession) return;
      const newExercises = await getExercises(currentSession.id);
      if (!newExercises) return;
      setExercises(newExercises);
    };
    uppdateExercises();
  }, [currentSession]);

  const updateCurrentSession = (id: string) => {
    // TODO oppdater DB
    if (!sessions) return;
    setSessions((pre) =>
      pre !== null
        ? pre.map((session) =>
            session.id === currentSession?.id ? currentSession : session
          )
        : null
    );

    const newCurrentSession = sessions.find((session) => session.id === id);
    if (!newCurrentSession) return;
    setCurrentSession(newCurrentSession);
  };

  return (
    <main className={styles.main}>
      <div>
        <input
          type="text"
          onChange={(e) => setMesoName(e.target.value)}
          onBlur={() => modifyMesoName(meso.id, mesoName)}
          value={mesoName}
        />
      </div>

      <div>
        <input
          type="number"
          onChange={(e) => setWeekLength(parseInt(e.target.value))}
          onBlur={() => modifyMesoWeekLength(meso.id, weekLength)}
          value={weekLength}
        />
      </div>

      <div className={styles["session-selector"]}>
        <ArrowButtonLeft size="large" />
        <h1>Økt 1 av 3</h1>
        <ArrowButtonRight size="large" />
      </div>

      <button>Legg til ny økt</button>

      {currentSession ? <SessionCard session={currentSession} /> : null}
    </main>
  );
};

export default PlanleggMesoTemp;

type SessionCardProps = {
  session: WorkoutSession;
};

const SessionCard = ({ session }: SessionCardProps) => {
  const [name, setName] = useState(session.name);
  const [exercises, setExercises] = useState<Exercise[] | null>(null);

  const [day, setDay] = useState(getDay(session.dayIndex));
  const [exercisesToChange, setExercisesToChange] = useState<Exercise[]>([]);

  useEffect(() => {
    const uppdateExercises = async () => {
      const newExercises = await getExercises(session.id);
      if (!newExercises) return;
      newExercises.sort((a, b) => a.index - b.index);
      newExercises.forEach((exercise, i) => {
        if (exercise.index !== i) {
          exercise.index = i;
        }
      });
      setExercises(newExercises);
    };
    uppdateExercises();
  }, []);

  useEffect(() => {
    if (exercisesToChange.length === 0) return;
    console.log("exercisesToChange", exercisesToChange);

    const modify = async () => {
      await modifyExercise(exercisesToChange[0]);
      setExercisesToChange((pre) => pre.slice(1));
    };
    modify();
  }, [exercisesToChange]);

  const dayChange = (day: string) => {
    setDay(day);
    modifySessionDayIndex(session.id, getDayIndex(day));
  };

  const moveExercise = (id: string, direction: "up" | "down") => {
    if (!exercises) return;

    setExercises((prevExercises) => {
      if (!prevExercises) return null;

      const index = prevExercises.findIndex((exercise) => exercise.id === id);
      if (index === -1) return prevExercises;

      let newIndex = index + (direction === "down" ? 1 : -1);

      if (newIndex < 0 || newIndex >= prevExercises.length)
        return prevExercises;

      let exercisesCopy = [...prevExercises];
      [exercisesCopy[index], exercisesCopy[newIndex]] = [
        exercisesCopy[newIndex],
        exercisesCopy[index],
      ];

      exercisesCopy[index].index = index;
      exercisesCopy[newIndex].index = newIndex;

      setExercisesToChange((pre) => [
        ...pre,
        exercisesCopy[index],
        exercisesCopy[newIndex],
      ]);

      return exercisesCopy;
    });
  };

  const addNewExersise = async () => {
    console.log("TODO: oppdater DB");
    const newExersise = await makeNewExercise(session);
    if (!newExersise) return alert("error");
    setExercises((pre) => (pre ? [...pre, newExersise] : [newExersise]));
  };

  const deleteExercise = async (id: string) => {
    const deleted = await removeExercise(id);
    if (!deleted) return "error";
    setExercises((pre) =>
      pre ? pre.filter((exercise) => exercise.id !== id) : null
    );
    return "deleted";
  };

  const changeNameOfExercise = (name: string, id: string) => {
    setExercises((pre) => {
      if (!pre) return null;
      const newExersises = pre.map((ex) =>
        ex.id === id ? { ...ex, name: name } : ex
      );

      const updatedExersise = newExersises.find((ex) => ex.id === id);

      if (!updatedExersise) return pre;
      modifyExercise(updatedExersise);

      return newExersises;
    });
  };

  return (
    <div className={styles["session-card"]}>
      <h2>{/*JSON.stringify(session)*/} </h2>
      <input
        type="text"
        className={styles["session-name"]}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => {
          modifySessionName(session.id, name);
        }}
        value={name}
      />

      <select
        className={styles["session-day"]}
        value={day}
        onChange={(e) => {
          dayChange(e.target.value);
        }}
      >
        {days.map((day, i) => (
          <option key={day + i} value={day}>
            {day}
          </option>
        ))}
      </select>

      {exercises ? (
        <div className={styles["exercise-wrapper"]}>
          {exercises.map((exercise) => (
            <ExerciseCard
              exercise={exercise}
              exercisesLength={exercises.length}
              moveExercise={moveExercise}
              key={exercise.id}
              deleteExercise={deleteExercise}
              changeNameOfExercise={changeNameOfExercise}
            />
          ))}
          <button onClick={() => addNewExersise()}>Legg til ny øvelse</button>
        </div>
      ) : (
        <span>loading</span>
      )}
    </div>
  );
};

type ExerciseCardProps = {
  exercise: Exercise;
  exercisesLength: number;
  moveExercise: (id: string, direction: "up" | "down") => void;
  deleteExercise: (id: string) => Promise<"deleted" | "error">;
  changeNameOfExercise: (name: string, id: string) => void;
};

const ExerciseCard = ({
  exercise,
  exercisesLength,
  moveExercise,
  deleteExercise,
  changeNameOfExercise,
}: ExerciseCardProps) => {
  const [name, setName] = useState(exercise.name);
  const [sets, setSets] = useState(3);
  const [disableDelete, setDisableDelete] = useState(false);

  const handleSetChange = (delta: number) => {
    setSets((pre) => {
      if (pre + delta < 1) return 1;
      if (pre + delta > 9) return 9;
      return pre + delta;
    });
  };

  const handleDelete = async () => {
    setDisableDelete(true);
    const result = await deleteExercise(exercise.id);
    if (result === "deleted") return;
    setDisableDelete(false);
  };

  return (
    <>
      {/*JSON.stringify(exercise)*/}
      <div className={styles["exercise-card"]}>
        <div className={styles["input-wrapper"]}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => changeNameOfExercise(name, exercise.id)}
            className={styles["exercise-name"]}
          />
          <div className={styles["sets-reps-waight-wrapper"]}>
            <div>
              <p>Start sett: </p> <input type="number" max={10} min={1} />
            </div>
            <div>
              <p>Start vekt: </p> <input type="number" min={0} max={999} />
            </div>
            <div>
              <p>Start reps: </p> <input type="number" min={5} max={30} />
            </div>
          </div>
        </div>
        <div className={styles["button-wrapper"]}>
          <ArrowButtonUp
            onClick={() => moveExercise(exercise.id, "up")}
            size="medium"
            disabled={exercise.index === 0}
          />
          <RemoveButton
            onClick={() => handleDelete()}
            loading={disableDelete}
            size="medium"
          />
          <ArrowButtonDown
            onClick={() => moveExercise(exercise.id, "down")}
            size="medium"
            disabled={exercise.index === exercisesLength - 1}
          />
        </div>
      </div>
    </>
  );
};

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};
