import React, { useState } from 'react';
import NumberFormat from 'react-number-format';

const Cart = ({
  item,
  state,
  currency,
  currencies,
  totalPrice,
  overlayHide,
  onIncrement,
  onDecrement,
  onDelete,
  onChange,
}) => {
  // let testImg = require('../assets/images/menu1.jpg');
  console.log(state);
  return (
    <div className={state === true ? 'cart-overlay-visible' : 'cart-overlay'}>
      <div className="cart">
        <span className="close-cart">
          <i
            onClick={() => overlayHide(state)}
            className="fa fa-chevron-left"
          ></i>
        </span>
        <span className="cart-label">your cart</span>
        <div>
          <select name="" id="" className="cart-dropdown" onChange={onChange}>
            {currencies.map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        {item.map((data, index) => (
          <div key={index} className="cart-content">
            {/* cart item  */}
            <i
              onClick={() => onDelete(data.id)}
              className="fa fa-times delete-cart-item"
            ></i>
            <div className="cart-item">
              <div>
                <h4>{data.title}</h4>

                {/* <span className="remove-item">remove</span>  */}
                <div className="cart-quantity">
                  <i
                    style={{ cursor: 'pointer' }}
                    onClick={() => onIncrement(data)}
                    className="fa fa-plus"
                  ></i>
                  <span className="item-amount">{data.quantity}</span>
                  <i
                    style={{ cursor: 'pointer' }}
                    onClick={() => onDecrement(data)}
                    className="fa fa-minus"
                  ></i>
                </div>
              </div>
              <div className="cart-price">
                <h5>
                  <NumberFormat
                    displayType={'text'}
                    value={data.price}
                    thousandSeparator={true}
                    prefix={currency}
                  ></NumberFormat>
                </h5>
              </div>
              <img src={data.image_url} alt="" />
            </div>

            {/* end of cart item  */}
          </div>
        ))}
        <div className="cart-footer">
          <h3>
            subtotal
            <span className="cart-total">
              <NumberFormat
                displayType={'text'}
                value={totalPrice}
                thousandSeparator={true}
                prefix={currency}
              ></NumberFormat>
            </span>
          </h3>
          <div className="cart-button">
            <button className="clear-cart btn btn-primary-cart">
              make this a subscription [save 20%]
            </button>
            <button className="clear-cart btn btn-secondary-cart">
              proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
