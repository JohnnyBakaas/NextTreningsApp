"use server";

import { Meso } from "@/contracts/meso";

export const saveMesoPlan = async (values: Meso) => {
  setTimeout(() => {}, 1000);
  console.log(values);
  return {
    success: true,
  };
};
