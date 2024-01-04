import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles["grouper"]}>
        <h1>Dagens økt:</h1>
        <h1>Push</h1>
      </div>
      <Link
        href={"/workouts/overview/0000-0000-0000-0000"}
        className={[styles.link, styles["start-button"]].join(" ")}
      >
        <h1>Start trening</h1>
      </Link>
      <div className={styles["grouper"]}>
        <Link href={""} className={styles.link}>
          <h1>Oversikt</h1>
        </Link>
        <Link href={"/"} className={styles.link}>
          <h1>Logg</h1>
        </Link>
      </div>
    </main>
  );
}
