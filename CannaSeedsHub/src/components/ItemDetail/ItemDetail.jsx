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
    <div className="cardContainer">
      <div className="card mb-3" style={{ maxWidth: "640px" }}>
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
                <small className={`card-text ${styles.cardText}`}>
                  $ {item.price}
                </small>
                <p className={`card-text ${styles.cardText}`}>
                  Stock: {item.stock}
                </p>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={decrementQuantity}
                >
                  <i className="bi bi-dash-lg"></i>
                </button>

                <span className="mx-2">{quantity}</span>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={incrementQuantity}
                >
                  <i className="bi bi-plus-lg"></i>
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => {
                    addItem(item, quantity);
                    toast.success("Product successfully added", {
                      position: "top-right",
                      autoClose: 3000,
                      gravity: bottom,
                      hideProgressBar: false,
                      draggable: true,
                      oldestFirst: true,
                    });
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
