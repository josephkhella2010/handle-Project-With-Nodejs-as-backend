import React, { useEffect, useState } from "react";
import MobileNavBar from "./MobileNavBar";
import DesktopNavBar from "./DesktopNavBar";
import styles from "./navBar.module.css";
export default function MainNavBar() {
  const mobileWidth: number = 768;
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < mobileWidth) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.wrapper}>
        {isMobile ? <MobileNavBar /> : <DesktopNavBar />}
      </div>
    </div>
  );
}
