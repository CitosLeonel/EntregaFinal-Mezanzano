export const getCartQuantity = (cart) => {
  let count = 0;

  cart.forEach((item) => {
    count += item.quantity;
  });

  return count;
};


export const getCartTotal = (cart) => {
    return cart.reduce((acc, items) => acc + items.quantity * items.price, 0);
};




export const mapCartToOrderItems = (cart) => {
  return cart.map(items => ({
    id: items.id,
    quantity: items.quantity,
    price: items.price,
    title: items.title,
  }));
};