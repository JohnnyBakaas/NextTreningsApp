"use server";

import { db } from "@/db/db";

export const removeExercise = async (exerciseId: string) => {
  const exercise = await db.exercise.delete({
    where: {
      id: exerciseId,
    },
  });

  return exercise;
};
