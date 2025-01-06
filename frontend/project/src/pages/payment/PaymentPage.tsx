import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./payment.module.css";
export default function PaymentPage() {
  const TotalPrice = useSelector((state: any) => state.cart.totalPrice);
  const [Error, setError] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    country: "",
    zipCode: "",
    telephone: "",
    visaNumber: "",
    cvc: ""
  });

  const [InputsValue, setInputsValue] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    country: "",
    zipCode: "",
    telephone: "",
    visaNumber: "",
    cvc: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputsValue((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newError = {
      name: InputsValue.name ? "" : "Please write your name.",
      surname: InputsValue.surname ? "" : "Please write your surname.",
      email: InputsValue.email ? "" : "Please write your email.",
      address: InputsValue.address ? "" : "Please write your address.",
      country: InputsValue.country ? "" : "Please write your country.",
      zipCode: InputsValue.zipCode ? "" : "Please write your zip code.",
      telephone: InputsValue.telephone
        ? ""
        : "Please write your telephone number.",
      visaNumber: !InputsValue.visaNumber
        ? "Visa number is required."
        : isNaN(Number(InputsValue.visaNumber))
        ? "Visa number must be numeric."
        : InputsValue.visaNumber.length !== 16
        ? "Visa number must be 16 numeric digits."
        : "",
      cvc: !InputsValue.cvc
        ? "CVC is required."
        : isNaN(Number(InputsValue.cvc))
        ? "CVC must be numeric."
        : InputsValue.cvc.length !== 3
        ? "CVC must be 3 numeric digits."
        : ""
    };

    setError(newError);

    const hasError = Object.values(newError).some((error) => error !== "");
    if (hasError) {
      return;
    }
    try {
      const newPayment = {
        name: InputsValue.name,
        surname: InputsValue.surname,
        email: InputsValue.email,
        address: InputsValue.address,
        country: InputsValue.country,
        zipCode: InputsValue.zipCode,
        telephone: InputsValue.telephone,
        visaNumber: InputsValue.visaNumber,
        cvc: InputsValue.cvc
      };
      const postApi = await axios.post(
        "http://localhost:5000/api/addPayment",
        newPayment
      );
      console.log(postApi);
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  return (
    <div className={styles.paymentMainWrapper}>
      <div className={styles.paymentWrapper}>
        <h1>Payment</h1>
        <form onSubmit={handleSubmit} className={styles.formConatiner}>
          <label>
            <b>Name</b>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={InputsValue.name}
              onChange={handleChange}
            />
          </label>
          {Error.name && <p style={{ color: "red" }}>{Error.name}</p>}

          <label>
            <b>Surname</b>
            <input
              type="text"
              placeholder="Surname"
              name="surname"
              value={InputsValue.surname}
              onChange={handleChange}
            />
          </label>
          {Error.surname && <p style={{ color: "red" }}>{Error.surname}</p>}

          <label>
            <b>Address</b>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={InputsValue.address}
              onChange={handleChange}
            />
          </label>
          {Error.address && <p style={{ color: "red" }}>{Error.address}</p>}

          <label>
            <b>Zip Code</b>
            <input
              type="text"
              placeholder="Zip Code"
              name="zipCode"
              value={InputsValue.zipCode}
              onChange={handleChange}
            />
          </label>
          {Error.zipCode && <p style={{ color: "red" }}>{Error.zipCode}</p>}

          <label>
            <b>Country</b>
            <input
              type="text"
              placeholder="Country"
              name="country"
              value={InputsValue.country}
              onChange={handleChange}
            />
          </label>
          {Error.country && <p style={{ color: "red" }}>{Error.country}</p>}

          <label>
            <b>Email Address</b>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={InputsValue.email}
              onChange={handleChange}
            />
          </label>
          {Error.email && <p style={{ color: "red" }}>{Error.email}</p>}

          <label>
            <b>Telephone Number</b>
            <input
              type="tel"
              placeholder="Telephone Number"
              name="telephone"
              value={InputsValue.telephone}
              onChange={handleChange}
            />
          </label>
          {Error.telephone && <p style={{ color: "red" }}>{Error.telephone}</p>}

          <label>
            <b>Visa Number</b>
            <input
              type="text"
              placeholder="Visa Number"
              name="visaNumber"
              value={InputsValue.visaNumber}
              onChange={handleChange}
              maxLength={16}
            />
          </label>
          {Error.visaNumber && (
            <p style={{ color: "red" }}>{Error.visaNumber}</p>
          )}

          <label>
            <b>CVC Number</b>
            <input
              type="text"
              placeholder="CVC Number"
              name="cvc"
              value={InputsValue.cvc}
              onChange={handleChange}
              maxLength={3}
            />
          </label>
          {Error.cvc && <p style={{ color: "red" }}>{Error.cvc}</p>}

          {TotalPrice > 0 && <h3>Total Price: {TotalPrice} $</h3>}
          <button type="submit" className={styles.btn}>Confirm Payment</button>
        </form>
      </div>
    </div>
  );
}
