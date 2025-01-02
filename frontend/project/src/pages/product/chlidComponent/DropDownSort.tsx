/* import React, { useState } from "react";
import styles from "../product.module.css";

export default function DropDownSort({
  dropDownValue,
  dropDownVal,
  setDropDownVal,
  handleDropDown
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const addClass = isOpen ? styles.open : "";

  return (
    <div className={styles.dropDownWrapper} onClick={() => setIsOpen(!isOpen)}>
      <div className={styles.dropDownContainer}>{dropDownVal}</div>
      <div className={`${styles.dropDownMenu} ${addClass}`}>
        {dropDownValue &&
          dropDownValue.map((item, index) => {
            return (
              <p onClick={() => handleDropDown(item.name)} index={index}>
                {item.name}
              </p>
            );
          })}
      </div>
    </div>
  );
}
 */
import React, { useState } from "react";
import styles from "../product.module.css";

interface DropDownItem {
  name: string;
}

interface DropDownSortProps {
  dropDownValue: DropDownItem[]; // Array of dropdown items
  dropDownVal: string; // Current selected dropdown value
  setDropDownVal: (value: string) => void; // Function to set dropdown value
  handleDropDown: (name: string) => void; // Function to handle dropdown selection
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

  return (
    <div className={styles.dropDownWrapper} onClick={toggleDropdown}>
      <div className={styles.dropDownContainer}>{dropDownVal}</div>
      <div className={`${styles.dropDownMenu} ${addClass}`}>
        {dropDownValue.map((item, index) => (
          <p
            key={index} // Add a key for each mapped item
            onClick={() => handleDropDown(item.name)}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DropDownSort;
