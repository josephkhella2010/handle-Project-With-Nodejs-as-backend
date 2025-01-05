import React from "react";
import styles from "../home.module.css";
import { useNavigate } from "react-router-dom";

export default function FirstSection() {
  const navigate = useNavigate();
  return (
    <div className={styles.firstcontainer}>
      <div className={styles.firstContent}>
        <h1>Rea</h1>
        <h1>Upp till 60%</h1>
      </div>
      <div className={styles.secondContent}>
        <img src="/foto/home/homeOne.jpg" alt="" />
        <div className={styles.overlay}>
          <button
            className={styles.buyBtn}
            onClick={() => navigate("/product")}
          >
            Köppa Nu
          </button>
        </div>
      </div>
      <div className={styles.secondContent}>
        <img src="/foto/home/homeFive.jpg" alt="" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.secondContent}>
        <img src="/foto/home/homeSix.jpg" alt="" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.secondContentText}>
        <h1> Vi har kläder</h1> <h1>for alla åring och alla kön</h1>
      </div>
      <div className={styles.secondContent}>
        <div className={styles.imgContainer}>
          <img src="/foto/home/homeThree.jpg" alt="" />
          <img src="/foto/home/homeFour.jpg" alt="" />
        </div>

        <div className={styles.overlay}></div>
      </div>
    </div>
  );
}
