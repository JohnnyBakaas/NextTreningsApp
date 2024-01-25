import { auth } from "@/auth";
import { Session } from "next-auth/types";

export type SessinGetterProps = {
  setter: (sessin: Session | null) => void;
};

const SessinGetter = async ({ setter }: SessinGetterProps) => {
  const sessin = await auth();
  setter(sessin);
};

export default SessinGetter;
