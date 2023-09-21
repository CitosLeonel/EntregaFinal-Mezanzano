import { useState } from "react";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const isInCart = (id) => {
    const itemInCart = cart.find((item) => item.id === id);
    return !!itemInCart;
  };

  const addItem = (product, quantity) => {
    const itemInCart = isInCart(product.id);

    if (itemInCart) {
      const newQuantity = itemInCart.quantity + quantity;

      if (newQuantity <= product.stock) {
        const newCart = cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        });
        setCart(newCart);
      } else {
        console.log("Not enough stock available");
      }
    } else {
      if (quantity <= product.stock) {
        setCart([...cart, { ...product, quantity }]);
      } else {
        console.log("Not enough stock available");
      }
    }
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clear = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clear, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
