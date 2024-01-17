import styles from "@/ui/protected/dagens-okt/Dagens-okt.module.css";
import { auth } from "@/auth";
import WorkoutTable from "@/ui/protected/workoutTable/WorkoutTable";
import Link from "next/link";
import { cc } from "@/utils/classes";

const Page = async () => {
  const sessin = await auth();
  const id = sessin?.user.id;

  return (
    <main className={styles.main}>
      <h1>Øvelser</h1>
      {id}
      <WorkoutTable />
      <div className={styles.spacer}></div>
      <nav className={styles.nav}>
        <Link href={"/hjem"} className={cc([styles.link, styles.back])}>
          <h2>Tilbake</h2>
        </Link>
        <Link href={"/ovelse"} className={cc([styles.link, styles.next])}>
          <h2>Start</h2>
        </Link>
      </nav>
    </main>
  );
};

export default Page;
