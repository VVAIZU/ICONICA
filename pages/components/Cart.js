import React from "react";
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/cartState";
import CartList from "./CartList";
import styles from "../../styles/Cart.module.css";


const Cart = () => {
    const [cartItem, setCartItem] = useRecoilState(cartState);

    const totalPrice = () => {
        let total = 0
        cartItem.forEach(item => total += (item.pprice))
        return total
    }

    const createCheckoutSession = () => {
        // axios.post('api/checkout_sessions', {cartItem})
        // .then(res => {
        //     console.log(res)
        //     window.location = res.data.sessionURL
        // })
    }

    const removeFromCart = (productId) => {
        setCartItem((prevCartItem) => prevCartItem.filter((item) => item.id !== productId));
    };

    return (
        <div className={styles.cart}>
            <h1 className={styles.myh}>Products in your cart</h1>
            <div>
                {cartItem.length <= 0 ? (
                    <h1>Your Cart is Empty</h1>
                ) : (
                    cartItem.map((item) => (
                        <CartList key={item.id} data={item} removeFromCart={removeFromCart} /> 
                    ))
                )}
            </div>

            {cartItem.length > 0 && (<div>
                <h2 className={styles.total}>Total: ${totalPrice()}</h2>
                <button className={styles.button} onClick={createCheckoutSession}>Checkout</button>
            </div>)}
        </div>
    )
}

export default Cart