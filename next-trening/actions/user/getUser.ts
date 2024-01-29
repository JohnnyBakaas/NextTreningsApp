"use server";

import { db } from "@/db/db";

export const getUser = async (userId: string) => {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  return user;
};
