"use server";

import { db } from "@/db/db";
import { Exercise } from "@prisma/client";

export const makeNewSet = async (exercise: Exercise) => {
  const newSet = await db.set.create({
    data: {
      weight: 0,
      reps: 8,
      rir: 3,
      completed: false,

      exerciseId: exercise.id,
    },
  });

  return newSet;
};
