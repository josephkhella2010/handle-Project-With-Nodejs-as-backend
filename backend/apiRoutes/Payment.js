import express from "express";
let payment = [];

const PaymentPost = (sequelize) => {
  const router = express.Router();
  router.post("/addPayment", async (req, res) => {
    const {
      name,
      surname,
      email,
      address,
      country,
      zipCode,
      telephon,
      visaNumber,
      cvc
    } = req.body;
    try {
      const newPayment = {
        name,
        surname,
        email,
        address,
        country,
        zipCode,
        telephon,
        visaNumber,
        cvc
      };
      payment.push(newPayment);
      res.status(200).json({ payment: newPayment });
    } catch (error) {
      console.log("error");
      res.status(500).json({ error: "failed with post  method payment" });
    }
  });
  router.get("/getPayment", async (req, res) => {
    try {
      res.status(200).json(payment);
    } catch (error) {
      console.log("error");
      res.status(500).json({ error: "failed with get  method payment" });
    }
  });

  return router;
};

export default PaymentPost;
