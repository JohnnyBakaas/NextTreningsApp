"use client";

import { useState } from "react";
import styles from "@/ui/protected/ovelse/Ovelse.module.css";

type Set = {
  waight: number;
  reps: number;
  rir: number;
};

const oktPage = () => {
  const [sets, setSets] = useState<Set[]>([
    {
      waight: 60,
      reps: 5,
      rir: 2,
    },
    {
      waight: 60,
      reps: 5,
      rir: 2,
    },
  ]);

  const getSet = async (index: number) => {
    console.log("TODO: Gjør alt");
  };

  const addSet = () => {
    const newSet =
      sets.length > 0
        ? { ...sets[sets.length - 1] }
        : { waight: 0, reps: 0, rir: 0 };
    setSets([...sets, newSet]);
  };

  const changeExercise = (dir: "next" | "prev") => {
    console.log(dir);
    console.log("TODO Implimenter denne. Husk at du trenger Index på øvelsen");
  };

  return (
    <main>
      <h1>Øvelse</h1>
      <div>
        <h2>Benkpress</h2>
        <div className={styles["table-wrapper"]}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles["table-element"]}>Vekt</th>
                <th className={styles["table-element"]}>Reps</th>
                <th className={styles["table-element"]}>RIR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sets.map((_set, i) => (
                <TableSet sets={sets} setSets={setSets} index={i} key={i} />
              ))}
              <tr>
                <td colSpan={4}>
                  <button
                    className={styles["add-sett-button"]}
                    onClick={addSet}
                  >
                    Legg til sett
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button>{"<-"}</button>
          <button>{"->"}</button>
        </div>
      </div>
    </main>
  );
};

export default oktPage;

type TableSetProps = {
  sets: Set[];
  setSets: (pre: Set[]) => void;
  index: number;
};

const TableSet = ({ sets, setSets, index }: TableSetProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Set
  ) => {
    const newSets = sets.map((set, i) =>
      i === index ? { ...set, [field]: e.target.value } : set
    );
    setSets(newSets);
  };

  const handleDelete = () => {
    setSets(sets.filter((_, i) => i !== index));
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          value={sets[index].waight}
          onChange={(e) => handleChange(e, "waight")}
          className={styles["table-element"]}
        />
      </td>
      <td>
        <input
          type="text"
          value={sets[index].reps}
          onChange={(e) => handleChange(e, "reps")}
          className={styles["table-element"]}
        />
      </td>
      <td>
        <input
          type="text"
          value={sets[index].rir}
          onChange={(e) => handleChange(e, "rir")}
          className={styles["table-element"]}
        />
      </td>
      <td>
        <button onClick={handleDelete} className={styles["table-element"]}>
          X
        </button>
      </td>
    </tr>
  );
};
