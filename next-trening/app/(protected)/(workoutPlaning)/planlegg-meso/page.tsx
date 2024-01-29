import { auth } from "@/auth";
import PlanleggMeso from "@/ui/protected/planleggMeso/PlanleggMeso";

const PlanleggMesoPage = async () => {
  const sessin = await auth();

  return <PlanleggMeso session={sessin} />;
};

export default PlanleggMesoPage;
