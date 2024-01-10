"use server";

import { DEFALT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type loginProps = {
  email: string;
  password: string;
};

const login = async (values: loginProps) => {
  console.log(values);

  const { email, password } = values;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFALT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Feil e-post eller passord" };
        default:
          return { error: "Noe gikk galt" };
      }
    }
    throw error;
  }
};

export default login;
