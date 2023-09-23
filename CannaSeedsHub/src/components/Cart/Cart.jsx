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
    <div>
      <div>
        <h1 className={styles["Cart-title"]}>Cart</h1>
      </div>

      {cart.length === 0 ? (
        <p>
          Your cart is empty. <i class="bi bi-cart-x"></i>
        </p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product name</th>
                <th>Unit price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
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
                      className="btn btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total purchase: ${calculateTotal()}</p>
          <div>
            <button className="btn btn-success" onClick={clear}>
              Clear cart
            </button>
            <Link to="/checkout">
              <button className="btn btn-success">Checkout</button>
            </Link>
            <Link to="/">
              <button className="btn btn-success">Continue shopping</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
