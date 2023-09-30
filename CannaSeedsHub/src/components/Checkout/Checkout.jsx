import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import CartContext from "../../context/CartContext";
import { serverTimestamp } from "firebase/firestore";
import { getCartTotal, mapCartToOrderItems } from "../../utils";
import { createOrder } from "../../services";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const { cart, clear } = useContext(CartContext);
  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const total = getCartTotal(cart);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckout = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error("Please complete all contact information.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
        setPurchaseCompleted(true); // Marcamos la compra como completada
      })
      .catch((error) => {
        console.error("Error creating order", error);
      });
  };

  return (
    <div className={styles["checkoutContainer"]}>
      <h1 className={styles["ppalTitle"]}>Checkout</h1>

      {!purchaseCompleted && (
        <div>
          <div className="text-center">
            <h2 className={styles["formTitle"]}>
              Complete your information to continue with your purchase
            </h2>
          </div>

          <form className={`container border p-4 rounded ${styles.customForm}`}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </div>
      )}

      {!purchaseCompleted ? (
        <h3 className={`text-decoration-underline ${styles.text}`}>
          Purchase summary
        </h3>
      ) : (
        orderId && <p className={styles["text"]}>The order id is: {orderId}</p>
      )}

      {!purchaseCompleted && (
        <div>
          <div>
            <h4 className={styles["text"]}>Products:</h4>

            <div className={`row row-cols-1 row-cols-md-3 g-4 ${styles.cardContainer}`}>
              {cart.map((item) => (
                <div key={item.id} className="col">
                  <div className="card" style={{ width: "18rem" }}>
                    <div className="card-header fw-bold">{item.title}</div>
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
                </div>
              ))}
            </div>
          </div>

          <p className={styles["totalPurchase"]}>
            <strong>Total purchase: ${total}</strong>
          </p>

          <div className={styles["buttonsContainer"]}>
            <Link
              className="btn btn-success border border-dark text-dark fw-bold"
              to="/cart"
            >
              Back to Cart
            </Link>

            <button
              className="btn btn-success border border-dark text-dark fw-bold"
              onClick={handleCheckout}
            >
              Complete purchase
            </button>
          </div>

          {isLoading && <p>Processing purchase...</p>}
        </div>
      )}
    </div>
  );
};

export default Checkout;
