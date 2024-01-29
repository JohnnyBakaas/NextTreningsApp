"use server";

import { db } from "@/db/db";
import { Exercise } from "@prisma/client";

export const modifyExercise = async (exercise: Exercise) => {
  const modifiedExercise = await db.exercise.update({
    where: {
      id: exercise.id,
    },
    data: {
      name: exercise.name,
      index: exercise.index,
    },
  });
  return modifiedExercise;
};
