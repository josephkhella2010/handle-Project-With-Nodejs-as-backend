import React, { useState } from "react";
import { CheckBoxArr, radioBox } from "../../../utils/BoxesValue";
import DropDownSort from "./DropDownSort";
import { dropDownValue } from "../../../utils/BoxesValue";

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
  return (
    <div>
      <div>
        <h1>radio box</h1>
        {/* radio */}
        <div>
          {radioBox &&
            radioBox.map((item, index: number) => {
              return (
                <label htmlFor="" key={index}>
                  <input
                    type="radio"
                    value={item.value}
                    checked={radioVal === item.value}
                    onChange={handleRadio}
                  />
                  {item.name}
                </label>
              );
            })}
          <p>{radioVal}</p>
          <div>
            {/* Checkbox */}
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
                    {item.name}
                  </label>
                );
              })}
            <p>{boxValues}</p>
          </div>
          {/* search bar */}
          <div>
            <input
              type="text"
              placeholder="Search...."
              value={searchValue}
              onChange={handleSearch}
            />
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
      </div>
    </div>
  );
}
