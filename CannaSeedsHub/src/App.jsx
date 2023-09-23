
import { Routes, Route } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import NavBar from "./components/NavBar/NavBar";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <CartProvider>
      <NavBar />

      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
