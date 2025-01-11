import React, { useEffect, useState } from "react";
import { CheckBoxArr, radioBox } from "../../../utils/BoxesValue";
import DropDownSort from "./DropDownSort";
import { dropDownValue } from "../../../utils/BoxesValue";
import styles from "../product.module.css";
import { FaSearch } from "react-icons/fa";

export default function FilterSection({
  handleSearch,
  handleCheckBox,
  handleDropDown,
  handleRadio,
  searchValue,
  dropDownVal,
  radioVal,
  boxValues,
  setDropDownVal
}: any) {
  const [showSearchIcon, setShowSearchIcon] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const inputElement = document.querySelector("#search-input");
      const iconElement = document.querySelector(
        `.${styles.searchIconContent}`
      );

      if (
        inputElement &&
        !inputElement.contains(target) &&
        iconElement &&
        !iconElement.contains(target)
      ) {
        setShowSearchIcon(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.FilterContainer}>
      <div className={styles.secondFliterContainer}>
        {/* search bar */}
        <div
          className={styles.sreachBar}
          onClick={() => setShowSearchIcon(true)}
          id="search-input">
          <input
            type="text"
            placeholder="Search...."
            value={searchValue}
            onChange={handleSearch}
          />
          {showSearchIcon && (
            <div className={styles.searchIconContent}>
              <FaSearch />
            </div>
          )}
        </div>
        {/* dropDown */}
        <div>
          <DropDownSort
            dropDownValue={dropDownValue}
            dropDownVal={dropDownVal}
            setDropDownVal={setDropDownVal}
            handleDropDown={handleDropDown}
          />
        </div>
      </div>
      <div className={styles.firstFilterSection}>
        {/* radio */}
        <div className={styles.RadioFilter}>
          <h3>Valje din färg</h3>
          <div className={styles.radioContent}>
            {radioBox &&
              radioBox.map((item, index: number) => {
                return (
                  <label htmlFor={item.value}>
                    <input
                      type="radio"
                      value={item.value}
                      checked={radioVal === item.value}
                      onChange={handleRadio}
                    />
                    <span>{item.name}</span>
                  </label>
                );
              })}
          </div>
          {/*           <p>{radioVal}</p>
           */}{" "}
        </div>
        <div className={styles.checkboxSection}>
          <h3>Valje din kladerType</h3>
          {/* Checkbox */}
          <div className={styles.checkboxContent}>
            {CheckBoxArr &&
              CheckBoxArr.map((item, index: number) => {
                return (
                  <label htmlFor="" key={index}>
                    <input
                      type="checkbox"
                      value={item.value}
                      checked={boxValues.includes(item.value)}
                      onChange={handleCheckBox}
                    />
                    <span>{item.name}</span>
                  </label>
                );
              })}
          </div>

          {/* <p>{boxValues}</p> */}
        </div>
      </div>
    </div>
  );
}
