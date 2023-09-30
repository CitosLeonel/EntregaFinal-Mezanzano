import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, removeItem, clear } = useContext(CartContext);

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
  };

  return (
    <div className={styles["cartContainer"]}>
      <div>
        <h1 className={styles["cartTitle"]}>Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div>
          <div className={styles["emptyCart"]}>
            <p>Your cart is empty.</p>
            <i className="bi bi-bag-x-fill"></i>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className={`table ${styles.customTable}`}>
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Unit price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{item.quantity}</td>
                    <td>${calculateSubtotal(item)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger border border-dark"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles["totalPurchase"]}>
            <strong>Total purchase: ${calculateTotal()}</strong>
          </p>
          <div
            className={`mt-3 d-flex justify-content-center ${styles["buttonsContainer"]}`}
          >
            <button
              className="btn btn-success border border-dark text-dark fw-bold"
              onClick={clear}
            >
              Clear cart
            </button>
            <Link to="/checkout">
              <button className="btn btn-success border border-dark text-dark fw-bold">
                Checkout
              </button>
            </Link>
            <Link to="/">
              <button className="btn btn-success border border-dark text-dark fw-bold">
                Continue shopping
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
