
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CartProvider from "./context/CartProvider";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import NavBar from "./components/NavBar/NavBar";
import Checkout from "./components/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import "react-toastify/dist/ReactToastify.css";

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

      <ToastContainer />
    </CartProvider>
  );
}

export default App;
