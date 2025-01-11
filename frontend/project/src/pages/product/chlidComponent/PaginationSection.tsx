import React from "react";
import styles from "../product.module.css";

export default function PaginationSection({
  pagination,
  handleClick,
  handlePrevious,
  handleNext,
  currentPage,
  totalPages
}: any) {
  return (
    <>
      <button
        onClick={handlePrevious}
        className={`${styles.prevBtn} ${
          currentPage === 1 ? styles.disable : ""
        }`}
        disabled={currentPage === 1}>
        previous
      </button>
      {pagination &&
        pagination.map((item: number, index: number) => {
          const addClass = item === currentPage ? styles.active : "";
          return (
            <button
              key={index}
              onClick={() => handleClick(item)}
              className={`${styles.pagiBtn} ${addClass}`}>
              {item}
            </button>
          );
        })}
      <button
        onClick={handleNext}
        className={`${styles.nextBtn} ${
          currentPage === totalPages ? styles.disable : ""
        }`}
        disabled={currentPage === totalPages}>
        next
      </button>
    </>
  );
}
