import styles from "@/ui/page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles["bc-img"]} />
      <h1>Next trening</h1>
      <h2>
        Du må trene hardt for å våkse, men for å våkse best må du trene smart.
        Vi kan ikke hjelpe deg med å trene hart, men vi kan hjelpe deg med å
        trene smart
      </h2>
      <div className={styles["cta-wrapper"]}>
        <Link href={"/registrer"} className="cta">
          <h1>Registrer</h1>
        </Link>
        <Link href={"/logg-inn"} className="cta">
          <h1>Logg inn</h1>
        </Link>
      </div>
    </main>
  );
}
