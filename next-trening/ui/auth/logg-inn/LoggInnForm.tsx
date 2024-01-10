"use client";

import styles from "./LoggInnFrom.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { useState, useTransition } from "react";
import Link from "next/link";
import { cc } from "@/utils/classes";
import login from "@/actions/login";
import { ErrorMessage } from "@/ui/errorMessage/ErrorMessage";
import Sosials from "../sosials/Sosials";

export default function LoggInnForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    startTransition(() => {
      login({ email: email, password: password }).then((data) => {
        console.log(data);
        if (!data) {
          setError("Noe gikk galt");
        } else if (data.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles["input-wrapper"]}>
          <label htmlFor="email">E-post</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Deg@DinMain.no"
            disabled={isPending}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className={styles["input-wrapper"]}>
          <div className={styles["password-wrapper"]}>
            <label htmlFor="password">Passord</label>
            <button
              type="button"
              onClick={() => setShowPassword((pre) => !pre)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <input
            id="password"
            name="password"
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            disabled={isPending}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <button type="submit" className={styles["button"]}>
          {isPending ? <CgSpinnerTwoAlt /> : "Logg inn!"}
        </button>
      </form>

      <div>
        <div className={cc([styles.form, styles.new])}>
          <Sosials />
        </div>

        <div className={cc([styles.form, styles.new])}>
          <Link
            href={"/registrer"}
            className={cc([styles["button"], styles["new-button"]])}
          >
            Registrer!
          </Link>
        </div>
      </div>
    </>
  );
}
