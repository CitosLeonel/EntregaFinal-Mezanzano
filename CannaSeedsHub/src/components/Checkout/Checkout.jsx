import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { serverTimestamp } from "firebase/firestore";
import { getCartTotal, mapCartToOrderItems } from "../../utils";
import { createOrder } from "../../services";

const Checkout = () => {
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { cart, clear } = useContext(CartContext);

  const total = getCartTotal(cart);

  const handleCheckout = () => {
    const order = {
      buyer: {
        name: "Leonel",
        phone: "35166666",
        email: "leo@gmail.com",
      },
      items: mapCartToOrderItems(cart),
      total,
      date: serverTimestamp(),
    };

    setIsLoading(true);
    createOrder(order).then((docRef) => {
      setOrderId(docRef.id);
      setIsLoading(false);
      clear();
    });
  };

  return (
    <div>
      <h1>Checkout</h1>

      <h2>Purchase summary</h2>

      {orderId && <p>The order id is: {orderId}</p>}

      {!orderId && (
        <>
          <div>
            <h4>Complete your information to continue with your purchase</h4>
            {/* To Do (TODO) por hacer, for de contacto */}
          </div>
          <div>
            <h4>Products:</h4>
            <div className="card" style={{ width: "18rem" }}>
              {cart.map((item) => (
                <div key={item.id}>
                  <div className="card-header">{item.title}</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Quantity: {item.quantity}
                    </li>
                    <li className="list-group-item">
                      Unit price: ${item.price}
                    </li>
                    <li className="list-group-item">
                      Subtotal: ${item.price * item.quantity}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <p>Total purchase: ${total}</p>

          <button onClick={handleCheckout}>Complete purchase</button>

          {isLoading && <p>Processing purchase...</p>}
        </>
      )}
    </div>
  );
};

export default Checkout;
