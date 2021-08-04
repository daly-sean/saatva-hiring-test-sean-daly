import React, { useEffect, createContext, useReducer } from "react";

const cartContext = createContext();

//Improvement: Create cart object:
//{
//  mattress.name: [item, item, item...],
//  mattress.name: [item, item, item...],
//}
let initialState = {
  cart: [],
};

function cartReducer(state, action) {
  let updatedCart;
  switch (action.type) {
    case "GET_CART":
      return { cart: action.payload };
    case "ADD_TO_CART":
      updatedCart = { cart: [...state.cart, action.payload] };
      localStorage.setItem("cart", JSON.stringify(updatedCart.cart));
      return updatedCart;
    case "REMOVE_FROM_CART":
      updatedCart = { cart: action.payload };
      localStorage.setItem("cart", JSON.stringify(updatedCart.cart));
      return updatedCart;
    default:
      console.log("default");
  }
}

function CartProvider(props) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));

    if (savedCart?.length) {
      dispatch({ type: "GET_CART", payload: savedCart });
    }
  }, []);

  const { Provider } = cartContext;

  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>;
}

export { cartContext, CartProvider };
