"use client";

import { useState } from "react";
import styles from "./WorkoutTable.module.css";
import { IoIosSettings } from "react-icons/io";

const WorkoutTable = () => {
  const exercises = ["Knebøy", "Markløft", "Benkpress", "Skulderpress"];

  return (
    <table className={styles.table}>
      <tbody className={styles.tbody}>
        {exercises.map((exercise) => (
          <WorkoutTableCard exercise={exercise} key={exercise} />
        ))}
      </tbody>
    </table>
  );
};
export default WorkoutTable;

const WorkoutTableCard = ({ exercise }: { exercise: string }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <tr className={styles.row}>
      <td className={styles.td}>
        <div className={styles.smal}>
          <h2>{exercise}</h2>
          <button onClick={() => setShowSettings((pre) => !pre)}>
            <IoIosSettings />
          </button>
        </div>
        {showSettings && (
          <div>
            <h2>En annen øvelse</h2>
          </div>
        )}
      </td>
    </tr>
  );
};
