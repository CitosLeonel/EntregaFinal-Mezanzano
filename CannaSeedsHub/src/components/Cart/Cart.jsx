import { useContext } from "react";
import CartContext from "../../context/CartContext";

const Cart =  () => {
    const { cart, addItem, removeItem, clear } = useContext(CartContext);

    return (
        <div>    
            <h1>Cart</h1>
        </div>

        
        


    )
}







export default Cart;