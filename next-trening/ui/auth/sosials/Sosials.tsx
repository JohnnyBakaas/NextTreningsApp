"use client";
import { cc } from "@/utils/classes";
import styles from "./Sosials.module.css";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFALT_LOGIN_REDIRECT } from "@/routes";

const Sosials = () => {
  const loginWithGithub = () => {
    signIn("github", {
      callbackUrl: DEFALT_LOGIN_REDIRECT,
    });
  };

  const loginWithGoogle = () => {
    signIn("google", {
      callbackUrl: DEFALT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className={styles.sosials}>
      <button
        onClick={() => loginWithGithub()}
        className={cc([styles.github, styles.button])}
      >
        <FaGithub />
      </button>
      <button
        onClick={() => loginWithGoogle()}
        className={cc([styles.google, styles.button])}
      >
        <FaGoogle />
      </button>
    </div>
  );
};

export default Sosials;
