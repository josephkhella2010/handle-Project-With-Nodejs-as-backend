import React from "react";
import styles from "./footer.module.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className={styles.footerMainWrapper}>
      <div className={styles.footerWrapper}>
        <h1>shopping gjort enkelt.</h1>
        <div className={styles.bottomSection}>
          <div className={styles.linksSection}>
            <h4>Länkar</h4>
            <ul className={styles.linksList}>
              <a href="/">Home</a>
              <a href="/product">Product</a>
              <a href="/login">Login Eller Skapa Konto</a>
            </ul>
          </div>
          <div className={styles.socialSection}>
            <h4>Sociala medier</h4>
            <div className={styles.socialIcons}>
              <FaFacebook className={styles.icons} />
              <FaInstagram className={styles.icons} />
              <FaYoutube className={styles.icons} />
              <FaLinkedin className={styles.icons} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
