import { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./CartWidget.module.css";
import { getCartQuantity } from "../../utils";

const CartWidget = () => {
  const { cart } = useContext(CartContext);
  const quantity = getCartQuantity(cart);

  console.log(cart);

  return (
    <div>
      <button type="button" className="btn btn-dark">
      <i className={`bi bi-cart4 bi-lg ${styles["cart-icon"]}`}></i>
        <span className="badge rounded-pill bg-danger">
          {quantity > 0 ? quantity : ""}
        </span>
      </button>
    </div>
  );
};

export default CartWidget;
