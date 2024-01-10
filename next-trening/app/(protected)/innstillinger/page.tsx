import { auth, signOut } from "@/auth";
import Link from "next/link";

export default async function Innstillinger() {
  const sessin = await auth();
  return (
    <main>
      <h1>innsitillings side</h1>
      <h2>{JSON.stringify(sessin)}</h2>
      {sessin?.user?.image && (
        <img src={sessin?.user?.image} alt={sessin?.user?.image} />
      )}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button>Logg ut</button>
      </form>
      <button>
        <h1>
          <Link href={"ny-meso"}>Ny peso</Link>
        </h1>
      </button>
      <button>
        <h1>
          <Link href={"planlegg-meso"}>Planlegg peso</Link>
        </h1>
      </button>
    </main>
  );
}
