import PropTypes from "prop-types";
import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = ({ items, isLoading, addItem }) => {
  if (isLoading) {
    return <h2>Loading product...</h2>;
  }

  if (!items) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={`/images/${items.imageId}`}
            className="img-fluid rounded-start"
            alt="plant image"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{items.title}</h5>
            <p className="card-text">{items.description}</p>
            <div className="card-footer">
              <small className="card-text">$ {items.price}</small>
              <p className="card-text">Stock: {items.stock}</p>
              <ItemCount stock={items.stock} initial={1} onAdd={addItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemDetail.propTypes = {
  items: PropTypes.object,
  isLoading: PropTypes.bool,
  addItem: PropTypes.func,
};

export default ItemDetail;
