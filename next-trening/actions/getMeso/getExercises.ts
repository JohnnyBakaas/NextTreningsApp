"use server";

import { db } from "@/db/db";

export const getExercises = async (sessionId: string) => {
  const exercises = await db.exercise.findMany({
    where: {
      sessionId,
    },
  });

  return exercises;
};
