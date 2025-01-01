import React from "react";
import styles from "./product.module.css";
import FirstSection from "./chlidComponent/FirstSection";

export default function Product() {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.Wrapper}>
        <h1>products</h1>
        <FirstSection />
      </div>
    </div>
  );
}
