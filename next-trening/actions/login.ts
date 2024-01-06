"use server";

export type loginProps = {
  email: string;
  password: string;
};

export const login = async (values: loginProps) => {
  console.log(values);
  await new Promise((r) => setTimeout(r, 1000));
  setTimeout(() => {}, 1000);
  if (!values.password) {
    return { error: "Ikke validert" };
  }

  return { success: true };
};
