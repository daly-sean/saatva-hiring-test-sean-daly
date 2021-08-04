import React, { useContext, useState } from "react";
import "./navbar.scss";
import { cartContext } from "../cart-context/CartContext.jsx";
import { CartDetails } from "../cart/CartDetails.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
//Credit to FontAwesome for their amazing free icons! https://fontawesome.com/

export function NavBar(props) {
  const { cart } = useContext(cartContext);
  const [isCartVisible, setIsCartVisible] = useState(false);

  function handleIsCartVisibleClick() {
    setIsCartVisible((isCartVisible) => !isCartVisible);
  }

  return (
    <nav-bar>
      <a href="https://www.saatva.com/" className="navBar__home">
        <h1>Saatva</h1>
      </a>

      <div className="navBar__cart" onClick={handleIsCartVisibleClick}>
        <div className="navBar__cart-number">{cart?.length}</div>
        <div className="navBar__cart-c-icon">
          <FontAwesomeIcon icon={faShoppingCart} className="icon" />
        </div>
        {isCartVisible && <CartDetails />}
      </div>
    </nav-bar>
  );
}
