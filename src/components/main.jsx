import React, { useEffect, useState } from 'react';
import Cart from './cart';
import { gql, useQuery } from '@apollo/client';
import { LOAD_PRODUCTS, GET_PRICE } from '../GraphQL/Queries';

const Main = () => {
  const { error, loading, data } = useQuery(LOAD_PRODUCTS);

  const [products, setProducts] = useState([]);
  const [currency, setCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [cart, setCart] = useState([]);
  const [state, setState] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const {
    error: errorPrice,
    loading: loadingPrice,
    data: dataPrice,
  } = useQuery(GET_PRICE, {
    variables: { currency },
  });

  useEffect(() => {
    if (data) {
      setCurrencies(data.currency);
      // formatProductsData(data.products);
      setProducts(data.products);
      console.log(data.products);
    }
    if (dataPrice) {
      const result = handleUpdatePrice(dataPrice.products);
      handleUpdate(result);
    }
  }, [data, dataPrice]);

  // function to split data in an array into rows
  const formatProductsData = (data) => {
    const myProducts = [...data];

    let array = [];
    let size = 3;

    for (let i = 0; i < myProducts.length; i += size) {
      array.push(myProducts.slice(i, i + size));
    }
    setProducts(array);
  };

  // function to add items to cart
  const addToCart = (item) => {
    let product;
    const cItem = { ...item, quantity: 1, total: item.price };

    if (localStorage.getItem('Cart') === null) {
      product = [];
    } else {
      product = JSON.parse(localStorage.getItem('Cart'));
    }
    const result = checkItemExistence(cItem);
    if (result === true) {
      itemQuantityAddition(cItem);
      setState(true);
    } else {
      product.push(cItem);
      setCart(product);
      setState(true);
      localStorage.setItem('Cart', JSON.stringify(product));
      const items = JSON.parse(localStorage.getItem('Cart'));
      let totalPrice = calcTotalPrice(items);
      setTotalPrice(totalPrice);
    }
  };

  // function to check if item already exists in cart
  const checkItemExistence = (item) => {
    if (localStorage.getItem('Cart') === null) return false;
    const lsItems = JSON.parse(localStorage.getItem('Cart'));
    if (lsItems.find((i) => i.id === item.id)) return true;
    return false;
  };

  // function to increment quantity of an already exisisting item in cart
  const itemQuantityAddition = (item) => {
    const items = [...JSON.parse(localStorage.getItem('Cart'))];

    const index = items.findIndex((i) => i.id === item.id);
    item = items.find((i) => i.id === item.id);
    items[index] = { ...item };
    items[index].quantity = parseInt(items[index].quantity) + parseInt(1);
    items[index].total = items[index].price * items[index].quantity;
    localStorage.setItem('Cart', JSON.stringify(items));
    let totalPrice = calcTotalPrice(items);
    setTotalPrice(totalPrice);
    setCart(items);
  };

  // function to handle increment of quantity
  const handleIncrement = (item) => {
    let totalPrice;
    const items = [...JSON.parse(localStorage.getItem('Cart'))];
    const index = items.findIndex((i) => i.id === item.id);
    items[index] = { ...item };
    items[index].quantity++;
    items[index].total = items[index].price * items[index].quantity;
    localStorage.setItem('Cart', JSON.stringify(items));
    totalPrice = calcTotalPrice(items);
    setCart(items);
    setTotalPrice(totalPrice);
  };

  // function to handle decrement of quantity
  const handleDecrement = (item) => {
    let totalPrice;
    const items = [...JSON.parse(localStorage.getItem('Cart'))];
    const index = items.findIndex((i) => i.id === item.id);
    items[index] = { ...item };
    items[index].quantity--;
    if (items[index].quantity > 0) {
      items[index].total -= items[index].price;
      localStorage.setItem('Cart', JSON.stringify(items));
      totalPrice = calcTotalPrice(items);
      setCart(items);
      setTotalPrice(totalPrice);
      // this.setState({ counter: counters, totalPrice });
    } else if (items[index].quantity < 1) {
      handleDelete(items[index].id);
    }
    //setCart(items);
  };

  // function to delete item from cart list
  const handleDelete = (itemID) => {
    let totalPrice;
    let items = [...JSON.parse(localStorage.getItem('Cart'))];
    const item = items.filter((i) => i.id !== itemID);
    localStorage.setItem('Cart', JSON.stringify(item));
    if (item.length === 0) {
      setState(false);
    }
    totalPrice = calcTotalPrice(item);
    setCart(item);
    setTotalPrice(totalPrice);
  };

  // function to handle change of currency
  const handleChange = (e) => {
    setCurrency(e.currentTarget.value);
  };

  // function to update price of items in cart
  const handleUpdatePrice = (data) => {
    let cartItems;
    if (localStorage.getItem('Cart') === null) return '';
    if (localStorage.getItem('Cart') !== null) {
      cartItems = [...JSON.parse(localStorage.getItem('Cart'))];
      const res = data.filter((el) => {
        return cartItems.find((el2) => {
          return el2.id === el.id;
        });
      });
      return res;
    }
  };

  // function to handle update of price
  const handleUpdate = (data) => {
    let oldData;
    const newData = [...data];
    if (localStorage.getItem('Cart') === null) {
      oldData = [];
    } else {
      oldData = [...JSON.parse(localStorage.getItem('Cart'))];
      oldData.forEach((element) => {
        newData.forEach((el2) => {
          if (element.id === el2.id) {
            element.price = el2.price;
            element.total = element.quantity * el2.price;
          }
        });
      });
      localStorage.setItem('Cart', JSON.stringify(oldData));
      let totalPrice = calcTotalPrice(oldData);
      setCart(oldData);
      setTotalPrice(totalPrice);
    }
  };

  // function to hide cart overlay
  const hideCartOverlay = (state) => {
    setState(!state);
  };

  // function to calculate price items in cart
  const calcTotalPrice = (obj) => {
    const items = obj;
    let price = 0;
    items.forEach((item) => {
      price += item.total;
    });
    return price;
  };
  // let testImg = require('../assets/images/menu1.jpg');
  return (
    <React.Fragment>
      {/* Begin Cart */}
      <Cart
        item={cart}
        state={state}
        currency={currency}
        currencies={currencies}
        totalPrice={totalPrice}
        overlayHide={hideCartOverlay}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
        onChange={handleChange}
      ></Cart>
      {/* End Cart */}
      {/* Main Site  */}
      <section id="filter">
        <div className="container filter-details">
          <div className="filter-info">
            <h3>All Products</h3>
            <p>A 360 degree look at lumin</p>
          </div>
          <select name="" id="" className="filter-dropdown">
            <option value="">filter By</option>
          </select>
        </div>
      </section>

      <section id="products">
        <div className=" products container products-details">
          {products.map((item, index) => (
            <div class="product-card">
              <div class="product-image">
                <img src={item.image_url} />
              </div>
              <div class="product-info">
                <h5>{item.title}</h5>
                <h6>
                  from {currency} {item.price}
                </h6>
                <button
                  onClick={() => addToCart(item)}
                  class="btn btn-primary display-2 text-light mt-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Main;
