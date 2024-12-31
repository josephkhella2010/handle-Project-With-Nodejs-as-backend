import React, { useState } from "react";
import styles from "./login.module.css";
import LoginForm from "./childComponent/LoginForm";
import RegisterForm from "./childComponent/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/stor";

export default function Login() {
  const isRegister = useSelector((state: RootState) => state.login.isRegister);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.subWrapper}>
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
