"use server";

import { db } from "@/db/db";

export const modifySessionName = async (sessionId: string, newName: string) => {
  const updatedSession = await db.workoutSession.update({
    where: {
      id: sessionId,
    },
    data: {
      name: newName,
    },
  });

  return updatedSession;
};

export const modifySessionDayIndex = async (
  sessionId: string,
  newDayIndex: number
) => {
  const updatedSession = await db.workoutSession.update({
    where: {
      id: sessionId,
    },
    data: {
      dayIndex: newDayIndex,
    },
  });

  console.log(updatedSession);
  return updatedSession;
};
