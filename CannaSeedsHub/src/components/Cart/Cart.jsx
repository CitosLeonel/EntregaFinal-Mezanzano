import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";

const Cart =  () => {
    const { cart, addItem, removeItem, clear } = useContext(CartContext);

    return (
        <><div>
            <h1>Cart</h1>
        </div>
        
        <Link to="/checkout">Finalizar compra</Link>
        
        
        </ >

    );
};







export default Cart;