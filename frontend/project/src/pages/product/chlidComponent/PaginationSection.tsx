import React from "react";

export default function PaginationSection({
  pagination,
  handleClick,
  handlePrevious,
  handleNext
}: any) {
  return (
    <>
      <button onClick={handlePrevious}>previous</button>
      {pagination &&
        pagination.map((item, index: number) => {
          return (
            <button key={index} onClick={() => handleClick(item)}>
              {item}
            </button>
          );
        })}
      <button onClick={handleNext}>next</button>
    </>
  );
}
