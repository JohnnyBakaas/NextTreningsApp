"use server";

import bcrypt from "bcrypt";
import { db } from "@/db/db";
import { getUserByEmail } from "@/data/user";

export type registrerProps = {
  email: string;
  password: string;
  passwordCheck: string;
};

export const registrer = async (values: registrerProps) => {
  console.log(values);
  setTimeout(() => {}, 1000);

  if (values.password.length < 6) {
    return { error: "For kort passord" };
  }

  if (values.password != values.passwordCheck) {
    return { error: "Passord må matche" };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);

  const existingUser = await getUserByEmail(values.email);

  if (existingUser) return { error: "E-post allerede i bruk" };

  await db.user.create({
    data: {
      email: values.email,
      password: hashedPassword,
    },
  });

  // TODO: send verifiserings email

  return { success: true };
};
