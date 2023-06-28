import React from "react";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";
import { useRecoilState } from "recoil";
import { cartState } from "../atoms/cartState";
import CartList from "./components/CartList";


const cart = () => {
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

    return (
        <Layout>
            <div className="container mx-auto">
                {cartItem.length <= 0 
                ? <h1 className="text-center text-4x1 mt-32">Your Cart is Empty</h1>
                : cartItem.map(item => <CartList key={item.id} data ={item} />)}
            </div> 

            {cartItem.length > 0 && (<div className="max-w-[800px] mx-auto mt-4"> 
            <h2 className="text-right text-3x1 font-bold">Total: ${totalPrice()}</h2>
            <button className="text-right bg-red-600 any-white py-4 px-12 hover:bg-red-800" 
            onClick={createCheckoutSession}>Checkout</button>
            </div>)}
        </Layout>
    )
}

export default cart