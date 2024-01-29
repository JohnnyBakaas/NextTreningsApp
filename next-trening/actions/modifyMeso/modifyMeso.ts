"use server";

import { db } from "@/db/db";

export const modifyMesoName = async (mesoId: string, newName: string) => {
  const updatedMeso = await db.meso.update({
    where: {
      id: mesoId,
    },
    data: {
      name: newName,
    },
  });

  return updatedMeso;
};

export const modifyMesoWeekLength = async (
  mesoId: string,
  newWeekLength: number
) => {
  const updatedMeso = await db.meso.update({
    where: {
      id: mesoId,
    },
    data: {
      weekLength: newWeekLength,
    },
  });

  return updatedMeso;
};
