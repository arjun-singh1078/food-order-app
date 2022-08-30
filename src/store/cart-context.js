import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (item) => {},
  clearCartItem: () => {},
});

export default CartContext;
