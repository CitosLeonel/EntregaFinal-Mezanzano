import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext";
import { serverTimestamp } from "firebase/firestore";
import { getCartTotal, mapCartToOrderItems } from "../../utils";
import { createOrder } from "../../services";

const Checkout = () => {
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const { cart, clear } = useContext(CartContext);

  const total = getCartTotal(cart);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      alert("Please complete all contact information.");
      return;
    }

    const order = {
      buyer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
      },
      items: mapCartToOrderItems(cart),
      total,
      date: serverTimestamp(),
    };

    setIsLoading(true);
    createOrder(order)
      .then((docRef) => {
        setOrderId(docRef.id);
        setIsLoading(false);
        clear();
      })
      .catch((error) => {
        console.error("Error creating order", error);
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

          <div>
            <h4>Complete your information to continue with your purchase</h4>

            <form>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
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
