"use server";

import { db } from "@/db/db";
import { Meso } from "@prisma/client";

export const getWorkoutSessions = async (meso: Meso) => {
  const sessions = await db.workoutSession.findMany({
    where: {
      mesoId: meso.id,
    },
  });

  console.log(meso);

  return sessions;
};
