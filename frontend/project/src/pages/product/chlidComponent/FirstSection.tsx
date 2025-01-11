/* import React, { useEffect, useState } from "react";
import styles from "../product.module.css";
import axios from "axios";
import ProductItem from "./ProductItem";
import PaginationSection from "./PaginationSection";
import FilterSection from "./FilterSection";

interface productType {
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
}

export default function FirstSection() {
  const [products, setProducts] = useState<productType[]>([]);
  const [slicedProducts, setSlicedProduct] = useState<productType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(0);
  const [visiblePage, setVisiblePage] = useState<number>(
    window.innerWidth <= 600 ? 3 : 4
  );
  const visiableCard: number = 3;
  const totalPages = Math.ceil(products.length / visiableCard); // Calculate total pages correctly

  // Fetch products from API
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Divide products into pages
  function dividePage(page: number) {
    const firstCardInPage = (page - 1) * visiableCard;
    const lastCardInPage = firstCardInPage + visiableCard;
    const slicedProduct = products.slice(firstCardInPage, lastCardInPage);

    if (page === startPage + visiblePage && page < totalPages) {
      setStartPage((prev) => prev + 1);
    } else if (page === startPage + 1 && page > 1) {
      setStartPage((prev) => prev - 1);
    }
    setSlicedProduct(slicedProduct);
  }

  /// Pagination
  const getPagination = () => {
    const TotalPages = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    ); // Use totalPages to limit the length
    return TotalPages.slice(startPage, startPage + visiblePage);
  };
  const pagination = getPagination();

  // Click function
  function handleClick(page: number) {
    setCurrentPage(page);
  }

  function handlePrevious() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }
  function handleNext() {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }

  // Handle resize for visiblePage
  useEffect(() => {
    const handleResize = () => {
      setVisiblePage(window.innerWidth <= 600 ? 3 : 4);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products on mount
  useEffect(() => {
    getProducts();
  }, []);

  // Update slicedProducts when products or currentPage changes
  useEffect(() => {
    dividePage(currentPage);
  }, [currentPage, products]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [dropDownVal, setDropDownVal] = useState<string>("");
  const [radioVal, setRadioVal] = useState<string>("");
  const [boxValues, setBoxValues] = useState<string[]>([]);

  // Handle search
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  }
  function handleDropDown(name: string) {
    setDropDownVal(name);
  }
  function handleRadio(e: React.ChangeEvent<HTMLInputElement>) {
    setRadioVal(e.target.value);
  }
  function handleCheckBox(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    let updateBoxValue;
    if (checked) {
      updateBoxValue = [...boxValues, value];
    } else {
      updateBoxValue = boxValues.filter((item) => {
        return item !== value;
      });
    }
    setBoxValues(updateBoxValue);
  }

  return (
    <div className={styles.firstSectionWrapper}>
      <FilterSection
        handleSearch={handleSearch}
        handleCheckBox={handleCheckBox}
        handleDropDown={handleDropDown}
        handleRadio={handleRadio}
        searchValue={searchValue}
        dropDownVal={dropDownVal}
        radioVal={radioVal}
        boxValues={boxValues}
        setDropDownVal={setDropDownVal}
      />
      <div className={styles.firstSection}>
        {slicedProducts &&
          slicedProducts.map((product, index: number) => {
            return <ProductItem product={product} index={index} key={index} />;
          })}
        <div>
          <PaginationSection
            pagination={pagination}
            handleClick={handleClick}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
} */
/* import React, { useEffect, useState } from "react";
import styles from "../product.module.css";
import axios from "axios";
import ProductItem from "./ProductItem";
import PaginationSection from "./PaginationSection";
import FilterSection from "./FilterSection";

interface productType {
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
}

export default function FirstSection() {
  const [products, setProducts] = useState<productType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(0);
  const [visiblePage, setVisiblePage] = useState<number>(
    window.innerWidth <= 600 ? 3 : 4
  );
  const visiableCard: number = 3;
  const totalPages = Math.ceil(products.length / visiableCard); // Calculate total pages correctly
  const [filteredItems, setFilteredItems] = useState<productType[]>([]);
  // Fetch products from API
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      return response.data.products;
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    async function getAllProduct() {
      const allProduct = await getProducts();
      setFilteredItems(allProduct);
      setProducts(allProduct.slice(0, visiableCard));
    }
    getAllProduct();
  });

  // Divide products into pages
  function dividePage(page: number) {
    const firstCardInPage = (page - 1) * visiableCard;
    const lastCardInPage = firstCardInPage + visiableCard;
    const slicedProduct = filteredItems.slice(firstCardInPage, lastCardInPage);

    if (page === startPage + visiblePage && page < totalPages) {
      setStartPage((prev) => prev + 1);
    } else if (page === startPage + 1 && page > 1) {
      setStartPage((prev) => prev - 1);
    }
    setProducts(slicedProduct);
  }

  /// Pagination
  const getPagination = () => {
    const TotalPages = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    ); // Use totalPages to limit the length
    return TotalPages.slice(startPage, startPage + visiblePage);
  };
  const pagination = getPagination();

  // Click function
  function handleClick(page: number) {
    setCurrentPage(page);
  }

  function handlePrevious() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }
  function handleNext() {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }

  // Handle resize for visiblePage
  useEffect(() => {
    const handleResize = () => {
      setVisiblePage(window.innerWidth <= 600 ? 3 : 4);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products on mount
    useEffect(() => {
    getProducts();
  }, []);

  // Update slicedProducts when products or currentPage changes
  useEffect(() => {
    dividePage(currentPage);
  }, [currentPage, filteredItems]);

  const [searchValue, setSearchValue] = useState<string>("");
  const [dropDownVal, setDropDownVal] = useState<string>("");
  const [radioVal, setRadioVal] = useState<string>("");
  const [boxValues, setBoxValues] = useState<string[]>([]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newSearchValue = e.target.value;
    setSearchValue(newSearchValue);
  }
  function handleDropDown(name: string) {
    setDropDownVal(name);
  }
  function handleRadio(e: React.ChangeEvent<HTMLInputElement>) {
    setRadioVal(e.target.value);
  }
  function handleCheckBox(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    let updateBoxValue;
    if (checked) {
      updateBoxValue = [...boxValues, value];
    } else {
      updateBoxValue = boxValues.filter((item) => {
        return item !== value;
      });
    }
    setBoxValues(updateBoxValue);
  }
  function filteredProduct() {
    let filtered = filteredItems;
    if (searchValue) {
      filtered = filteredItems.filter((item, index) => {
        return (
          searchValue.toLowerCase().includes(item.name.toLowerCase()) ||
          searchValue.toLowerCase().includes(item.color.toLowerCase())
        );
      });
    }
    if (radioVal && radioVal !== "all") {
      filtered = filteredItems.filter((item, index) => {
        return radioVal.toLowerCase() === item.color.toLowerCase();
      });
    }
    if (dropDownVal) {
      if (dropDownVal === "Cheapist") {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (dropDownVal === "Expensive") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }
    }
    if (boxValues.length > 0 && !boxValues.includes("all")) {
      filtered = filtered.filter((item, ind) => {
        return boxValues.includes(item.productType);
      });
    }
    setFilteredItems(filtered);
    setCurrentPage(1);
    setStartPage(0);
  }
  useEffect(() => {
    filteredProduct(searchValue, boxValues, dropDownVal, radioVal);
  }, [searchValue, boxValues, dropDownVal, radioVal]);

  return (
    <div className={styles.firstSectionWrapper}>
      <FilterSection
        handleSearch={handleSearch}
        handleCheckBox={handleCheckBox}
        handleDropDown={handleDropDown}
        handleRadio={handleRadio}
        searchValue={searchValue}
        dropDownVal={dropDownVal}
        radioVal={radioVal}
        boxValues={boxValues}
        setDropDownVal={setDropDownVal}
      />
      <div className={styles.firstSection}>
        {slicedProducts &&
          slicedProducts.map((product, index: number) => {
            return <ProductItem product={product} index={index} key={index} />;
          })}
        <div>
          <PaginationSection
            pagination={pagination}
            handleClick={handleClick}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
}
 */
import React, { useEffect, useState } from "react";
import styles from "../product.module.css";
import axios from "axios";
import ProductItem from "./ProductItem";
import PaginationSection from "./PaginationSection";
import FilterSection from "./FilterSection";

export interface BoxesType {
  name: string;
  value: string;
}

interface productType {
  name: string;
  url?: string;
  ind?: number;
  price: number;
  description: string;
  color?: string;
  productType: string;
}

/* export const radioBox: BoxesType[] = [
  { name: "All", value: "all" },
  { name: "Red", value: "red" },
  { name: "Black", value: "black" },
  { name: "Yellow", value: "yellow" },
  { name: "Blue", value: "blue" },
  { name: "White", value: "white" }
];

export const CheckBoxArr: BoxesType[] = [
  { name: "All", value: "all" },
  { name: "Jeans", value: "jeans" },
  { name: "Jacket", value: "jacket" },
  { name: "Shoes", value: "shoes" },
  { name: "T-shirt", value: "t-shirt" },
  { name: "Sweat-shirt", value: "sweat-shirt" }
];

export const dropDownValue: BoxesType[] = [
  { name: "Cheapist", value: "cheapist" },
  { name: "Expensive", value: "expensive" }
]; */

export default function FirstSection() {
  const [products, setProducts] = useState<productType[]>([]);
  const [filteredItems, setFilteredItems] = useState<productType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [startPage, setStartPage] = useState<number>(0);
  const [visiblePage, setVisiblePage] = useState<number>(
    window.innerWidth <= 600 ? 3 : 4
  );
  const visiableCard: number = 9;

  const totalPages = Math.ceil(filteredItems.length / visiableCard);

  const [searchValue, setSearchValue] = useState<string>("");
  const [dropDownVal, setDropDownVal] = useState<string>("Filter by price");
  const [radioVal, setRadioVal] = useState<string>("all");
  const [boxValues, setBoxValues] = useState<string[]>([]);

  // Fetch products from API
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    async function getAllProduct() {
      const allProduct = await getProducts();
      setProducts(allProduct);
      setFilteredItems(allProduct);
    }
    getAllProduct();
  }, []);
  async function filteredProducts() {
    let filtered = await getProducts();

    // Apply search filter
    if (searchValue) {
      filtered = filtered.filter(
        (item: productType) =>
          item.color?.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.productType.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // Apply radio button filter
    if (radioVal !== "all") {
      filtered = filtered.filter(
        (item: productType) =>
          item.color?.toLowerCase() === radioVal.toLowerCase()
      );
    }

    // Apply checkbox filter
    if (boxValues.length > 0) {
      if (!boxValues.includes("all")) {
        filtered = filtered.filter((item: productType) =>
          boxValues.some((boxVal) =>
            item.productType.toLowerCase().includes(boxVal.toLowerCase())
          )
        );
      }
    }

    // Apply dropdown filter
    if (dropDownVal === "Cheapist") {
      filtered.sort((a: any, b: any) => a.price - b.price);
    } else if (dropDownVal === "Expensive") {
      filtered.sort((a: any, b: any) => b.price - a.price);
    }
    console.log(filtered);
    setFilteredItems(filtered);
    setCurrentPage(1);
    setStartPage(0);
  }

  useEffect(() => {
    filteredProducts();
  }, [searchValue, radioVal, dropDownVal, boxValues]);

  // Pagination logic
  useEffect(() => {
    dividePage(currentPage);
  }, [currentPage, filteredItems]);

  function dividePage(page: number) {
    const firstCardInPage = (page - 1) * visiableCard;
    const lastCardInPage = firstCardInPage + visiableCard;
    if (page === startPage + visiblePage && page < totalPages) {
      setStartPage((prev) => prev + 1);
    } else if (page === startPage + 1 && page > 1) {
      setStartPage((prev) => prev - 1);
    }
    setProducts(filteredItems.slice(firstCardInPage, lastCardInPage));
  }

  const getPagination = () => {
    const TotalPages = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    return TotalPages.slice(startPage, startPage + visiblePage);
  };
  const pagination = getPagination();

  function handleClick(page: number) {
    setCurrentPage(page);
  }

  function handlePrevious() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }

  function handleNext() {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }
  /* ////////////////////// */
  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (value === "all") {
      setBoxValues(checked ? ["all"] : []);
    } else {
      setBoxValues((prev) => {
        if (checked) {
          return [...prev, value];
        } else {
          return prev.filter((val) => val !== value);
        }
      });
    }
  };
  return (
    <div className={styles.firstSectionWrapper}>
      <FilterSection
        handleSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
        handleCheckBox={handleCheckBox}
        /*    handleCheckBox={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value, checked } = e.target;
          setBoxValues((prev) =>
            checked ? [...prev, value] : prev.filter((val) => val !== value)
          );
        }} */

        handleDropDown={setDropDownVal}
        handleRadio={(e: React.ChangeEvent<HTMLInputElement>) =>
          setRadioVal(e.target.value)
        }
        searchValue={searchValue}
        dropDownVal={dropDownVal}
        radioVal={radioVal}
        boxValues={boxValues}
      />
      <div className={styles.firstSection}>
        {products.map((product: any, index) => (
          <ProductItem
            product={product}
            key={index}
            index={(currentPage - 1) * visiableCard + index}
          />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <PaginationSection
          pagination={pagination}
          handleClick={handleClick}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
