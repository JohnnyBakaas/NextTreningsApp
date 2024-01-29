"use server";

import { db } from "@/db/db";
import { getUser } from "../user/getUser";

export const makeNewMeso = async (userId: string, preset?: string) => {
  const user = await getUser(userId);
  if (!user) return console.log("no user");

  const newMeso = await db.meso.create({
    data: {
      name: "Ny meso",
      weekLength: 4,

      userId: user.id,
    },
  });

  console.log(newMeso);

  return newMeso;
};
