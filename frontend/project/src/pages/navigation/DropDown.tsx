import React, { useEffect, useState } from "react";
import styles from "./navBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { handleLanguage } from "../../reducer/LanguageSlice";
import { RootState } from "../../store/stor";
interface FlagType {
  url: string;
  lang: string;
}
export default function DropDown() {
  const flagArr: FlagType[] = [
    { url: "/foto/navigation/svflag.png", lang: "sv" },
    { url: "/foto/navigation/engFlag.png", lang: "en" }
  ];
  const selectedLang = useSelector(
    (state: RootState) => state.language.language
  );
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const showDropDown = isOpen ? styles.show : "";
  const selectedFlag = flagArr.find((item) => item.lang === selectedLang);
  useEffect(() => {
    localStorage.setItem("language", selectedLang);
  }, [selectedLang]);
  function handleSelectFlag(item: FlagType) {
    dispatch(handleLanguage(item.lang));
  }
  return (
    <div
      className={styles.dropDownContainer}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles.topSectionDropDown}>
        {selectedFlag && <img src={selectedFlag.url} />}
      </div>
      <div className={`${styles.BottomSectionDropDown} ${showDropDown}`}>
        {flagArr &&
          flagArr.map((item, index: number) => {
            const { url, lang } = item;
            return (
              <div
                key={index}
                className={styles.dropDownFlag}
                onClick={() => handleSelectFlag(item)}
              >
                <img src={url} alt={lang} />
                <span>{lang}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
