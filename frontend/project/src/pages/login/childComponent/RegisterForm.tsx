import React, { useEffect, useState } from "react";
import styles from "../login.module.css";
import { useDispatch } from "react-redux";
import { setIsRegister } from "../../../reducer/LoginSlice";
import axios from "axios";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";

interface userInformationType {
  username: string;
  email: string | number;
  password: string;
  repassword: string;
}
interface isPasswordType {
  password: Boolean;
  repassword: Boolean;
}

export default function RegisterForm() {
  const dispatch = useDispatch();

  const [userInformation, setUserInformation] = useState<userInformationType>({
    username: "",
    email: "",
    password: "",
    repassword: ""
  });

  const [error, setError] = useState<userInformationType>({
    username: "",
    email: "",
    password: "",
    repassword: ""
  });

  const [users, setUsers] = useState<userInformationType[]>([]);
  const [newUser, setNewUsers] = useState<userInformationType | null>(null);
  const [isPassword, setIsPassword] = useState<isPasswordType>({
    password: false,
    repassword: false
  });
  //////////////////////
  async function getAllUsers() {
    const getUser = await axios.get("http://localhost:5000/api/users");
    const usersData = getUser.data;

    setUsers(usersData);
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  ////////////////
  async function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newError = {
      username: userInformation.username ? "" : "Please write your username.",
      email: userInformation.email ? "" : "Please write your email.",
      password: userInformation.password ? "" : "Please write your password.",
      repassword: userInformation.repassword
        ? ""
        : "Please confirm your password."
    };

    // Check if the passwords match
    if (userInformation.password !== userInformation.repassword) {
      newError.repassword = "Password and confirm password do not match.";
    }

    // Check if any error exists
    const hasError = Object.keys(newError).some(
      (key) => newError[key as keyof userInformationType]
    );

    if (hasError) {
      setError(newError);
      return;
    }

    try {
      const allUsers = [...users];
      const findEmail = allUsers.find(
        (item: userInformationType) => item.email === userInformation.email
      );

      if (findEmail) {
        setError({
          ...newError,
          email: "Email is already taken. Please try another one."
        });
        return;
      } else {
        const postApi = await axios.post(
          "http://localhost:5000/api/register",
          userInformation
        );

        const userData = postApi.data;

        setNewUsers(userData);

        setError({
          username: "",
          email: "",
          password: "",
          repassword: ""
        });

        setUserInformation({
          username: "",
          email: "",
          password: "",
          repassword: ""
        });
      }
    } catch (error) {
      console.log("Error:", error);
      setError({
        ...newError,
        email: "An error occurred while registering. Please try again."
      });
    }
    dispatch(setIsRegister(false));
  }
  function handleShowPassword(type: keyof isPasswordType) {
    setIsPassword((prev) => ({
      ...prev,
      [type]: !prev[type]
    }));
  }
  return (
    <form className={styles.registerContainer} onSubmit={handleForm}>
      <div className={styles.registerFormSection}>
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={userInformation.username}
          onChange={(e) =>
            setUserInformation((prev) => ({
              ...prev,
              username: e.target.value
            }))
          }
        />
        {error.username && <p className={styles.error}>{error.username}</p>}

        <input
          type="text"
          placeholder="Email"
          value={userInformation.email}
          onChange={(e) =>
            setUserInformation((prev) => ({
              ...prev,
              email: e.target.value
            }))
          }
        />
        {error.email && <p className={styles.error}>{error.email}</p>}
        <div className={styles.passwordInput}>
          <input
            type={isPassword.password ? "text" : "password"}
            placeholder="Password"
            value={userInformation.password}
            onChange={(e) =>
              setUserInformation((prev) => ({
                ...prev,
                password: e.target.value
              }))
            }
          />
          {!isPassword.password ? (
            <IoMdEyeOff
              className={styles.passwordIcon}
              onClick={() => handleShowPassword("password")}
            />
          ) : (
            <IoIosEye
              className={styles.passwordIcon}
              onClick={() => handleShowPassword("password")}
            />
          )}
        </div>
        {error.password && <p className={styles.error}>{error.password}</p>}
        <div className={styles.passwordInput}>
          <input
            type={isPassword.repassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={userInformation.repassword}
            onChange={(e) =>
              setUserInformation((prev) => ({
                ...prev,
                repassword: e.target.value
              }))
            }
          />
          {!isPassword.repassword ? (
            <IoMdEyeOff
              className={styles.passwordIcon}
              onClick={() => handleShowPassword("repassword")}
            />
          ) : (
            <IoIosEye
              className={styles.passwordIcon}
              onClick={() => handleShowPassword("repassword")}
            />
          )}
        </div>
        {error.repassword && <p className={styles.error}>{error.repassword}</p>}

        <button type="submit">Register</button>
        <p onClick={() => dispatch(setIsRegister(false))}>
          If you already have an account, please click here to log in.
        </p>
      </div>
    </form>
  );
}
