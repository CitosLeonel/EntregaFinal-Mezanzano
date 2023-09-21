import PropTypes from "prop-types";


const ItemDetail = ({ item, isLoading, addItem }) => {
  if (isLoading) {
    return <h2>Loading product...</h2>;
  }

  if (!item) {
    return <h2>Product not found</h2>;
  }

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
              <button onClick={() => addItem(item, 1)}>agregar al carrito</button>
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
