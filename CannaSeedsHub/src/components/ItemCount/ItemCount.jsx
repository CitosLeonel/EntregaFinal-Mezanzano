import React, { useState } from 'react';

function ItemCount({ stock, initial, onAdd }) {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > initial) {
      setCount(count - 1);
    }
  };

  function handleAddToCart() {
    if (count > 0) {
      onAdd(count);
    }
  }

  return (
    <div>
      <div>
        <button onClick={handleDecrement} disabled={count === initial}>
          -
        </button>
        <span>{count}</span>
        <button onClick={handleIncrement} disabled={count === stock}>
          +
        </button>
      </div>
      <button onClick={handleAddToCart} disabled={count === 0 || count > stock}>
        Add to Cart
      </button>
    </div>
  );
}

export default ItemCount;
