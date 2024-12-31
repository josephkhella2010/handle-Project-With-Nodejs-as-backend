import React, { useEffect, useState } from "react";
import styles from "../login.module.css";
import {
  setIsLoggedIn,
  setIsRegister,
  setUserInfo
} from "../../../reducer/LoginSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [error, setError] = useState({
    username: "",
    password: ""
  });

  // Function to fetch users
  async function getUsers() {
    try {
      const getUserApi = await axios.get("http://localhost:5000/api/users");
      setAllUsers(getUserApi.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newError = {
      username: username ? "" : "Please write your username.",
      password: password ? "" : "Please write your password."
    };

    setError(newError);
    if (!username || !password) {
      return;
    }

    try {
      const findUser = allUsers.find(
        (user) => user.username === username || user.email === username
      );

      if (!findUser) {
        setError((prev) => ({
          ...prev,
          username: "Your username or email does not exist."
        }));
      } else {
        if (findUser.password !== password) {
          setError((prev) => ({
            ...prev,
            password: "Incorrect password."
          }));
        } else {
          const userInfo = { username, password };
          setError({ username: "", password: "" });
          const loginApi = await axios.post("http://localhost:5000/api/login", {
            username,
            password
          });
          dispatch(setIsLoggedIn(true));
          dispatch(setUserInfo(userInfo));
          localStorage.setItem("user", JSON.stringify(userInfo));
          navigate("/");
          console.log("Login success:", loginApi);
        }
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  }

  return (
    <form className={styles.loginFormContainer} onSubmit={handleLogin}>
      <div className={styles.loginFormSection}>
        <h1>Log in</h1>
        <input
          type="text"
          placeholder="Enter username or Email"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        {error.username && <p className={styles.error}>{error.username}</p>}

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <p className={styles.error}>{error.password}</p>}

        <button type="submit">Log in</button>

        <p onClick={() => dispatch(setIsRegister(true))}>
          If you don't have an account, please click here to register.
        </p>
      </div>
    </form>
  );
}
