"use client";

import { useState } from "react";
import SmallRoundButton from "../smallRoundButton/SmallRoundButton";
import YoutubeEmbed from "../youtubeEmbed/YoutubeEmbed";
import styles from "./DropDownVideo.module.css";

export default function DropDownVideo() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className={styles.flexer}>
        <h2>Video?</h2>
        <div
          className={
            show
              ? [styles["down-rotater"], styles["up-rotater"]].join(" ")
              : styles["down-rotater"]
          }
          onClick={() => setShow((pre) => !pre)}
        >
          <SmallRoundButton text="->" />
        </div>
      </div>
      <div
        className={
          show
            ? [styles["video-wrapper"], styles.show].join(" ")
            : styles["video-wrapper"]
        }
      >
        <YoutubeEmbed embedId="EdDqD4aKwxM" />
      </div>
    </div>
  );
}
