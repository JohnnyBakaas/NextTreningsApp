"use server";

import { Meso, MesoSessionData } from "@/contracts/meso";
import { db } from "@/db/db";

export const saveMesoPlan = async (userId: string, mesoData: Meso) => {
  if (!mesoData || !mesoData.sessions) return;

  console.log(userId);

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return console.log("no user");

  console.log(user);

  const mesos = await db.meso.findMany({
    where: {
      userId: user.id,
    },
  });

  let lastStartDate = new Date(0);
  let foundIndex = 0;

  for (let i = 0; i < mesos.length; i++) {
    const meso = mesos[i];
    if (meso.startDate && !meso.endDate && meso.startDate > lastStartDate) {
      lastStartDate = meso.startDate;
      foundIndex = i;
    }
  }

  console.log(mesos);
  const meso = mesos[foundIndex];

  if (!meso) {
    const ids = {
      sessionId: null,
      sessions: [],
    };

    const newSets = await Promise.all(
      mesoData.sessions.map(async (session) => {
        const createdSession = await db.workoutSession.create({
          data: {
            name: session.name,
            dayIndex: session.day,
            exercises: {
              create: session.exercises.map((exercise) => ({
                name: exercise.name,
                index: 0,
                sets: exercise.sets
                  ? {
                      createMany: {
                        data: Array.from({ length: exercise.sets }, () => ({
                          weight: 0,
                          reps: 8,
                          rir: 3,
                          completed: false,
                        })),
                      },
                    }
                  : undefined,
              })),
            },
          },
        });
        return createdSession.id;
      })
    );

    // Create sessions and exercises first
    const sessionIds = await Promise.all(
      mesoData.sessions.map(async (session) => {
        const createdSession = await db.workoutSession.create({
          data: {
            name: session.name,
            dayIndex: session.day,
            exercises: {
              create: session.exercises.map((exercise) => ({
                name: exercise.name,
                index: 0,
                sets: exercise.sets
                  ? {
                      createMany: {
                        data: Array.from({ length: exercise.sets }, () => ({
                          weight: 0,
                          reps: 8,
                          rir: 3,
                          completed: false,
                        })),
                      },
                    }
                  : undefined,
              })),
            },
          },
        });
        return createdSession.id;
      })
    );

    // Now create the Meso and link the sessions
    await db.meso.create({
      data: {
        userId: user.id,
        startDate: new Date(),
        name: mesoData.name,
        weekLength: mesoData.weekLength,
        sessions: {
          connect: sessionIds.map((id) => ({ id })),
        },
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(mesoData);
    return {
      success: true,
    };
  }
};
