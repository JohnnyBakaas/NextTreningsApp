import styles from "@/ui/protected/oversikt/Oversikt.module.css";
import Link from "next/link";

const Oversikt = () => {
  return (
    <main className={styles.main}>
      <h1>Oversikt</h1>
      <div className={styles["curent-meeso"]}>
        <h1>Mesocycle</h1>
        <Link href={"/newMeso"} className={styles["new-meso"]}>
          <h1>Start din mesocycle!</h1>
        </Link>
      </div>
    </main>
  );
};

export default Oversikt;
