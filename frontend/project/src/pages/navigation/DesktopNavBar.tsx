import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navBar.module.css";
import DropDown from "./DropDown";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { setIsLoggedIn, setUserInfo } from "../../reducer/LoginSlice";
import { isLogout } from "../../utils/LogOutFunction";
export default function DesktopNavBar() {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLogged);
  const userInfo = useSelector((state: RootState) => state.login.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (localStorageUser.username) {
      dispatch(setIsLoggedIn(true));
      dispatch(setUserInfo(localStorageUser));
    }
  }, [dispatch]);
  function logOutFunction() {
    isLogout(dispatch);
    navigate("/");
  }
  return (
    <nav className={styles.desktopNavBar}>
      <h1>
        <Link to="/" className={styles.LogoDesktopNav}>
          Logo
        </Link>
      </h1>
      <ul className={styles.menuDesktop}>
        <DropDown />
        <li>
          <Link to="/" className={styles.linkDesktop}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/product" className={styles.linkDesktop}>
            product
          </Link>
        </li>
        {!isLoggedIn ? (
          <li>
            <Link to="/login" className={styles.linkDesktop}>
              Login
            </Link>
          </li>
        ) : (
          <li onClick={logOutFunction}>
            <Link to="/" className={styles.linkDesktop}>
              logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
