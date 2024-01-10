import { auth } from "@/auth";
import styles from "@/ui/protected/bruker/Bruker.module.css";
import Link from "next/link";

const Hjem = async () => {
  const sessin = await auth();
  return (
    <main className={styles.main}>
      <h1>Next trening</h1>
      <div className={styles["todays-workout-wrapper"]}>
        <h1>Dagens økt:</h1>
        <h1>Push</h1>
        <Link href={"/dagens-okt"} className={styles.button}>
          <h1>Start</h1>
        </Link>
      </div>

      <div className={styles["others-wrapper"]}>
        <Link href={"/oversikt"} className={styles.button}>
          <h1>Oversikt</h1>
        </Link>
        <button className={styles.button}>
          <h1>Logg</h1>
        </button>
      </div>
    </main>
  );
};

export default Hjem;
