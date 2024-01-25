import { auth } from "@/auth";
import PlanleggMeso from "@/ui/protected/planleggMeso/PlanleggMeso";

const PlanleggMesoPage = async () => {
  const sessin = await auth();

  return <PlanleggMeso />;
};

export default PlanleggMesoPage;
