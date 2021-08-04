import React, { useState, useEffect, useContext } from "react";
import { cartContext } from "../cart-context/CartContext.jsx";
import "./marketplace.scss";
const mattressesJSON = require("../mattresses.json");

export function MarketPlace(props) {
  const { dispatch } = useContext(cartContext);
  const [mattresses, setMattresses] = useState(null);
  const [mattressDetail, setMattressDetail] = useState({
    name: "",
    price: null,
    reviewRating: 0,
    imageFileName: "",
  });
  const [isSelected, setIsSelected] = useState("classic");

  useEffect(() => {
    setMattresses(mattressesJSON.mattresses);
  }, []);

  useEffect(() => {
    if (mattresses) {
      setMattressDetail({ ...mattresses.classic });
    }
  }, [mattresses]);

  function handleSelectMattressClick(key, value) {
    setMattressDetail(value);
    setIsSelected(key);
  }

  function handleAddToCart() {
    dispatch({
      type: "ADD_TO_CART",
      payload: mattressDetail,
    });
  }

  return (
    <marketplace-home>
      <div className="marketplace__image">
        <img
          className="marketplace__image-src"
          src={`images/${mattressDetail.imageFileName}`}
          title={mattressDetail.name}
          alt={mattressDetail.name}
        ></img>
      </div>
      <div className="marketplace__details">
        <h2 className="marketplace__details-title">Choose Your Mattress</h2>
        <div className="marketplace__details-toggle">
          <label>Select Mattress Type</label>
          {mattresses && (
            <div className="marketplace__details-toggle-selector">
              {Object.entries(mattresses).map(([key, value]) => {
                return (
                  <button
                    key={value.name}
                    alt={value.name}
                    title={value.name}
                    className={`selector-option selector-option${
                      key === isSelected ? "--SELECTED" : ""
                    }`}
                    onClick={() => {
                      handleSelectMattressClick(key, value);
                    }}
                  >
                    {value.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="marketplace__details-selected-info">
          <div
            alt={`${mattressDetail.name}, ${mattressDetail.price}, ${mattressDetail.rating} Rating`}
            className="marketplace__details-selected-info-row"
          >
            <div className="name">{mattressDetail.name}</div>
            <div className="price">{`$ ${parseFloat(
              mattressDetail.price
            ).toFixed(2)}`}</div>
          </div>
          <div>Rating: {mattressDetail.reviewRating}</div>
        </div>
        <button
          alt="add to cart"
          title="add to cart"
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </marketplace-home>
  );
}
