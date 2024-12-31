import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import {
  setIsLoggedIn,
  setIsRegister,
  setUserInfo
} from "../../reducer/LoginSlice";
import { isLogout } from "../../utils/LogOutFunction";

export default function MobileNavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const addOpenClass = isOpen ? styles.open : "";
  const showClass = isOpen ? styles.show : "";
  const dispatch = useDispatch();
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const localStorageUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorageUser.username) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUserInfo(localStorageUser));
    }
  }, [dispatch]);
  function logOutFunction() {
    isLogout(dispatch);
    setIsOpen(!isOpen);
    navigate("/");
  }

  return (
    <nav className={styles.mobileNavBar}>
      <h1>
        <Link to="/" className={styles.LogoMobileNav}>
          Logo
        </Link>
      </h1>
      <div
        className={`${styles.hamburgContainer} ${addOpenClass}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.hamburgLine}></div>
        <div className={styles.hamburgLine}></div>
        <div className={styles.hamburgLine}></div>
      </div>
      <ul className={`${styles.menuMobile} ${showClass}`}>
        <li onClick={() => setIsOpen(!isOpen)}>
          <Link to="/" className={styles.linkMobile}>
            Home
          </Link>
        </li>
        <li onClick={() => setIsOpen(!isOpen)}>
          <Link to="/product" className={styles.linkMobile}>
            product
          </Link>
        </li>
        {isLogged ? (
          <li onClick={logOutFunction}>
            <Link to="/login" className={styles.linkMobile}>
              LogOut
            </Link>
          </li>
        ) : (
          <li onClick={() => setIsOpen(!isOpen)}>
            <Link to="/login" className={styles.linkMobile}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
