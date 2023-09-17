const CartWidget = () => {
  return (
    <div>
      <button type="button" class="btn btn-dark">
        <i class="bi bi-cart4 bi-lg"></i>{" "}
        <span class="badge rounded-pill bg-danger">0</span>
      </button>
    </div>
  );
};

export default CartWidget;
