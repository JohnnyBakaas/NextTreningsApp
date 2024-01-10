"use client";

import { ErrorMessage } from "@/ui/errorMessage/ErrorMessage";
import styles from "@/ui/protected/workoutPlaning/newMeso/NewMeso.module.css";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import Link from "next/link";

type presetWorkout =
  | "Upper Lower"
  | "Push Pull Legs"
  | "Full Body"
  | "Upper Only"
  | "Custom"
  | undefined;

const NewMeso = () => {
  const [sessions, setSessions] = useState(4);
  const [split, setSplit] = useState<presetWorkout>();

  const minimumDays = 1;
  const maximumDays = 10;

  const changeDays = (change: "up" | "down") => {
    if (change === "down" && sessions !== minimumDays) {
      setSessions((pre) => pre - 1);
    }
    if (change === "up" && sessions !== maximumDays) {
      setSessions((pre) => pre + 1);
    }

    setSplit(undefined);
  };

  const comfirmSplit = () => {
    if (
      split !== undefined &&
      sessions >= minimumDays &&
      sessions <= maximumDays
    ) {
      // TODO: send to backend
      alert("send to backend");
      return;
    }

    return;
  };

  return (
    <main className={styles.main}>
      <h1>Ny Meso</h1>
      <button>
        <h1>Kopier siste</h1>
      </button>
      <div className={styles["week-wrapper"]}>
        <h1>Økter i uka</h1>
        <div className={styles["days-input"]}>
          <button
            onClick={() => changeDays("down")}
            className={sessions === minimumDays ? styles["disabled-arrow"] : ""}
          >
            {sessions === minimumDays ? <AiOutlineStop /> : <FaArrowLeft />}
          </button>

          <h1> {sessions} </h1>

          <button
            onClick={() => changeDays("up")}
            className={sessions === maximumDays ? styles["disabled-arrow"] : ""}
          >
            {sessions === maximumDays ? <AiOutlineStop /> : <FaArrowRight />}
          </button>
        </div>

        {sessions === 1 && (
          <ErrorMessage message="Dette er for lite for å bygge muskler" />
        )}
        {sessions >= 9 && (
          <ErrorMessage message="Dette er antageligvis for mye volum" />
        )}
      </div>

      <div className={styles["split-wraper"]}>
        <h1>Split</h1>

        {sessions >= 3 && (
          <SplitButton
            selectedText={split}
            text="Upper Lower"
            onClick={setSplit}
          />
        )}

        {sessions >= 5 && (
          <SplitButton
            selectedText={split}
            text="Push Pull Legs"
            onClick={setSplit}
          />
        )}

        {sessions <= 4 && (
          <SplitButton
            selectedText={split}
            text="Full Body"
            onClick={setSplit}
          />
        )}

        <SplitButton
          selectedText={split}
          text="Upper Only"
          onClick={setSplit}
        />

        <SplitButton selectedText={split} text="Custom" onClick={setSplit} />
      </div>

      <button onClick={() => comfirmSplit()}>
        <h1>Start planlegging</h1>
      </button>
      <button>
        <Link href={"planlegg-meso"}>
          <h1>Planelegg meso</h1>
          <h3>TODO: Fullfør comfirmSplit</h3>
        </Link>
      </button>
    </main>
  );
};

export default NewMeso;

type SplitButtonProps = {
  selectedText: presetWorkout;
  text: presetWorkout;
  onClick: (text: presetWorkout) => void;
};

const SplitButton = ({ selectedText, text, onClick }: SplitButtonProps) => {
  return (
    <button
      onClick={() => onClick(text)}
      className={selectedText == text ? styles.selected : ""}
    >
      <h2>{text}</h2>
    </button>
  );
};
