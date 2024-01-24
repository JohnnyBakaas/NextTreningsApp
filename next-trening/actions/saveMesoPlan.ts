"use server";

import { Meso } from "@/contracts/meso";

export const saveMesoPlan = async (values: Meso) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(values);
  return {
    success: true,
  };
};
