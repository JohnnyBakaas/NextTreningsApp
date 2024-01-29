"use server";

import { db } from "@/db/db";
import { Meso } from "@prisma/client";

export const makeNewWorkoutSession = async (meso: Meso) => {
  const newSession = await db.workoutSession.create({
    data: {
      name: "Ny økt",
      dayIndex: 0,

      mesoId: meso.id,
    },
  });

  return newSession;
};
