"use server";

import { db } from "@/db/db";

export const getMeso = async (mesoId: string) => {
  const meso = await db.meso.findFirst({
    where: {
      id: mesoId,
    },
  });

  return meso;
};

export const getMesos = async () => {
  const sessions = await db.meso.findMany({});

  return sessions;
};
