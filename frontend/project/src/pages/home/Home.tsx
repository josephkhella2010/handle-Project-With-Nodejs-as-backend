import React, { useEffect } from "react";
import styles from "./home.module.css";
import { GetText } from "../../utils/translate";
import { HomeArr } from "./HomeArr";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store"; // Adjust to your Redux store path
import { setIsLoggedIn, setUserInfo } from "../../reducer/LoginSlice";
import FirstSection from "./childComponent/FirstSection";

export default function Home() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const isLoggedIn = useSelector((state: RootState) => state.login.isLogged);
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    console.log("LocalStorage User:", localStorageUser);
    if (localStorageUser.username) {
      console.log("Setting user from localStorage:", localStorageUser);
      dispatch(setIsLoggedIn(true));
      dispatch(setUserInfo(localStorageUser));
    }
  }, [dispatch]);

  return (
    <div className={styles.homeMainWrapper}>
      <div className={styles.homeWrapper}>
        <FirstSection />
      </div>
    </div>
    /*   <div className={styles.wrapper}>
      {isLoggedIn && <h1>Hello, {userInfo.username}</h1>}
      <h1>{GetText("home/title")}</h1>{" "}
      <div>
        {HomeArr.map((item, index) => (
          <div key={index}>
            <h2>{GetText(item.category)}</h2>{" "}
           
            {item.questions.map((question, qIndex) => (
              <div key={qIndex}>
                <h3>{GetText(question.title)}</h3> 
                <p>{GetText(question.content)}</p> 
              </div>
            ))}
          </div>
        ))}
      </div>
    </div> */
  );
}
