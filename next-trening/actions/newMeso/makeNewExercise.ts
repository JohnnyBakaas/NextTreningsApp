"use server";

import { db } from "@/db/db";
import { WorkoutSession } from "@prisma/client";
import { getExercises } from "../getMeso/getExercises";

export const makeNewExercise = async (workoutSession: WorkoutSession) => {
  if (!workoutSession) return console.log("no session");

  const otherExercises = await getExercises(workoutSession.id);

  let lastIndex = -1;

  otherExercises.forEach((exercise) => {
    if (exercise.index > lastIndex) lastIndex = exercise.index;
  });

  const newExercise = await db.exercise.create({
    data: {
      name: "Ny øvelse",
      index: lastIndex + 1,

      sessionId: workoutSession.id,
    },
  });

  return newExercise;
};
