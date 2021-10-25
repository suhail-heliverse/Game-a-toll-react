import React, { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Button from "@mui/material/Button";

function PaymentGateway(props) {
  const [product, setProduct] = useState({
    price: 10*100,
    name: "game a toll",
    productBy: "Heliverse",
    address: "transport nagar",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(
      "https://gamingatoll.com/api/stripe",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        console.log("response", response);
        if (response.status == 200) {
          //payment successfull
          props.success(true);
        } else {
          props.success(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(()=>{
    if(props.action) {
      document.getElementById("join-btn").click();
    }
  },[props.action])

  return (
    <div>
      <StripeCheckout
        stripeKey="pk_test_51JhqmUSBzHfyPbLgpsxXTdsE2Ww62CSlDjkFS1UKSFrwgHMSOJpUlrsbCI2jMgffUbAjf7FODB3fj0MCwsyNOVI100sHJfDXR0"
        token={makePayment}
        name="Join Fees"
        amount={product.price}
      >
        <Button id="join-btn" style={{display:"none"}} size="small">Join Now</Button>
      </StripeCheckout>
    </div>
  );
}

export default PaymentGateway;
