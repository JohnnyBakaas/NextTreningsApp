import { getMeso, getMesos } from "@/actions/getMeso/getMeso";
import { makeNewMeso } from "@/actions/newMeso/makeNewMeso";
import { getUser } from "@/actions/user/getUser";
import { auth } from "@/auth";
import PlanleggMesoTemp from "@/ui/protected/planleggMeso/PlanleggMesoTemp";

export default async function TestPage() {
  const sessin = await auth();

  console.log("sessin", sessin);
  const mesos = await getMesos();
  console.log(mesos);

  if (!sessin) return <div>loading</div>;

  let meso = await getMeso("clrwdzxs60004etg9acgdp2ff");

  if (!meso) return <div>loading</div>;
  return <PlanleggMesoTemp meso={meso} />;
}
