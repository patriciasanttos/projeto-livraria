import { useEffect, useState } from "react";
import "./CartNumber.scss";

function CartNumber({ isMobile }) {
  const cartCookie = JSON.parse(localStorage.getItem("cart")) || {};
  const cartItems = Object.keys(cartCookie).length
  const [quantity, setQuantity] = useState(cartItems);

  useEffect(() => { 
    const interval = setInterval(() => {
      const cartCookie = JSON.parse(localStorage.getItem("cart")) || {};
      const cartItems = Object.keys(cartCookie).length;
      setQuantity(cartItems);
    }, 2000)

    return () => clearInterval(interval);
  }, [])
  
  return (
    <>
      <div className={isMobile ? "cart-number-mobile" : "cart-number-desktop"}>
        {quantity}
      </div>
    </>
  );
}

export default CartNumber;
