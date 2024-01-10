"use client";

import { useState, useTransition } from "react";
import styles from "./RegisterForm.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ErrorMessage } from "@/ui/errorMessage/ErrorMessage";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import Link from "next/link";
import { cc } from "@/utils/classes";
import { registrer } from "@/actions/registrer";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(undefined);
    startTransition(() => {
      registrer({
        email: email,
        password: password,
        passwordCheck: passwordCheck,
      }).then(
        (
          data:
            | { error: string; success?: undefined }
            | { success: boolean; error?: undefined }
        ) => {
          console.log(data);
          if (data.error) {
            setError(data.error);
          }
        }
      );
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

        <div className={styles["input-wrapper"]}>
          <div className={styles["password-wrapper"]}>
            <label htmlFor="passwordCheck">Gjennta passord</label>
            <button
              type="button"
              onClick={() => setShowPassword((pre) => !pre)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <input
            id="passwordCheck"
            name="password"
            autoComplete="password"
            type={showPassword ? "text" : "password"}
            disabled={isPending}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
            value={passwordCheck}
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <button type="submit" className={styles["button"]}>
          {isPending ? <CgSpinnerTwoAlt /> : <Link href={""}>Registrer!</Link>}
        </button>
      </form>

      <div className={cc([styles.form, styles.new])}>
        <Link
          href={"/logg-inn"}
          className={cc([styles["button"], styles["new-button"]])}
        >
          Logg inn!
        </Link>
      </div>
    </>
  );
}
