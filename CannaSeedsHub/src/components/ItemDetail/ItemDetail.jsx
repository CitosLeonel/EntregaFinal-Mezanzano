import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./ItemDetail.module.css";

const ItemDetail = ({ item, isLoading, addItem }) => {
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <h2>Loading product...</h2>;
  }

  if (!item) {
    return <h2>Product not found</h2>;
  }

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles["cardContainer"]}>
      <div
        className={`card mb-3 ${styles.customCard}`}
        style={{ maxWidth: "720px" }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`/images/${item.imageId}`}
              className={`img-fluid rounded-start ${styles.cardImg}`}
              alt="plant image"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className={`card-title ${styles.cardTitle}`}>{item.title}</h5>
              <p className={`card-text ${styles.cardText}`}>
                {item.description}
              </p>
              <div className="card-footer">
                <small className={`card-text ${styles.cardFooterTxt}`}>
                  unit price: $ {item.price}
                </small>
                <p className={`card-text ${styles.cardText}`}>
                  Stock: {item.stock}
                </p>

                <button
                  type="button"
                  className="btn btn-success text-dark border border-dark"
                  onClick={decrementQuantity}
                >
                  <i className="bi bi-dash-lg"></i>
                </button>

                <span className="mx-2">
                  <strong>{quantity}</strong>
                </span>

                <button
                  type="button"
                  className="btn btn-success text-dark border border-dark"
                  onClick={incrementQuantity}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>

                <button
                  className="btn btn-success text-dark fw-bold border border-dark"
                  onClick={() => {
                    if (item.stock === 0) {
                      toast.error("Not enough stock available", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                    } else {
                      addItem(item, quantity);
                      toast.success("Product successfully added", {
                        position: "bottom-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                    }
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemDetail.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool,
  addItem: PropTypes.func,
};

export default ItemDetail;
