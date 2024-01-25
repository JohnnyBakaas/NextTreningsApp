"use server";

import { Meso, MesoSessionData } from "@/contracts/meso";
import { db } from "@/db/db";

export const saveMesoPlan = async (userId: string, mesoData: Meso) => {
  /*

  if (!mesoData || !mesoData.sessions) return;

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  }); 

  console.log(user);

  return

  await db.meso.create({
    data: {
      name: mesoData.name,
      sessions: {
        createMany: {
          data: mesoData.sessions.map((session: MesoSessionData) => ({
            name: session.name,
            dayIndex: session.day,
            exercises: {
              createMany: {
                data: session.exercises.map((exercise) => ({
                  name: exercise.name,
                  sets: exercise.sets,
                  completed: exercise.completed,
                })),
              },
            },
          })),
        },
      },
    },
  });

  const kake = await db.meso.findMany();

  console.log(kake);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(mesoData);
  return {
    success: true,
  };

  */
};
