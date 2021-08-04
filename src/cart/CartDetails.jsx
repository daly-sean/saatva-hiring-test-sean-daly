import React, { useContext, useMemo, useState, useEffect } from "react";
import "./cart.scss";
import { cartContext } from "../cart-context/CartContext.jsx";

export function CartDetails(props) {
  const { cart, dispatch } = useContext(cartContext);
  const [total, setTotal] = useState(null);

  const cartDeepClone = useMemo(() => {
    if (cart) {
      return JSON.parse(JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      sumTotal();
    }
  });

  function handleRemoveFromCart(itemIndex) {
    cartDeepClone.splice(itemIndex, 1);

    dispatch({
      type: "REMOVE_FROM_CART",
      payload: cartDeepClone,
    });
  }

  function sumTotal() {
    let costArray = [0];
    cart.forEach((item) => {
      costArray.push(item.price);
    });

    const total = parseFloat(costArray.reduce((a, b) => a + b)).toFixed(2);
    setTotal(total);
  }

  return (
    <cart-details>
      <div className="c-cart-items">
        {cart &&
          cart.map((item, i) => {
            return (
              <div key={i} className="cart__item">
                <div className="cart__item-info">
                  <div>{item.name}</div>
                  <div>(${parseFloat(item.price).toFixed(2)})</div>
                </div>
                <div
                  className="cart__item-remove-btn"
                  onClick={() => {
                    handleRemoveFromCart(i);
                  }}
                >
                  X
                </div>
              </div>
            );
          })}
        {!cart.length && <div className="cart__empty-msg">Cart is empty</div>}
      </div>
      {total && <div>Total: ${total}</div>}
      {!total && <div>Total: calculating...</div>}
      {/* TODO: enable checkout */}
      <button disabled>Checkout</button>
    </cart-details>
  );
}
