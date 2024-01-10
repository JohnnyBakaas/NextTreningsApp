import { auth } from "@/auth";
import styles from "@/ui/protected/bruker/Bruker.module.css";
import Link from "next/link";

const Bruker = async () => {
  const sessin = await auth();
  return (
    <main className={styles.main}>
      <h1>Bruker</h1>
      {JSON.stringify(sessin)}
    </main>
  );
};

export default Bruker;
