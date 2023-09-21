import PropTypes from "prop-types";
import { useState } from "react";

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
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`/images/${item.imageId}`}
            className="img-fluid rounded-start"
            alt="plant image"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <div className="card-footer">
              <small className="card-text">$ {item.price}</small>
              <p className="card-text">Stock: {item.stock}</p>

              <button onClick={decrementQuantity}>-</button>

              <span>{quantity}</span>

              <button onClick={incrementQuantity}>+</button>

              <button onClick={() => addItem(item, quantity)}>
                agregar al carrito
              </button>
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
