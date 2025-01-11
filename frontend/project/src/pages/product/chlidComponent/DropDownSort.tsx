import React, { useState } from "react";
import styles from "../product.module.css";

interface DropDownItem {
  name: string;
}

interface DropDownSortProps {
  dropDownValue: DropDownItem[];
  dropDownVal: string;
  setDropDownVal: (value: string) => void;
  handleDropDown: (name: string) => void;
}

const DropDownSort: React.FC<DropDownSortProps> = ({
  dropDownValue,
  dropDownVal,
  setDropDownVal,
  handleDropDown
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const addClass = isOpen ? styles.open : "";
  const isDisable =
    dropDownVal === "Filter by price" ? styles.disablePrice : "";
  return (
    <div className={styles.dropDownWrapper} onClick={toggleDropdown}>
      <div className={`${styles.dropDownContainer} ${isDisable}`}>
        {dropDownVal}
      </div>
      <div className={`${styles.dropDownMenu} ${addClass}`}>
        {dropDownValue.map((item, index) => (
          <p
            key={index} // Add a key for each mapped item
            onClick={() => handleDropDown(item.name)}>
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropDownSort;
