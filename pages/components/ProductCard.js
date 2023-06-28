import React from 'react';
import { useRecoilState } from "recoil";
import Link from 'next/link';
import { cartState } from '../../atoms/cartState';
import { Toast, toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const [cartItem, setCartItem] = useRecoilState(cartState);

    const addItemToCart = () => {
        if(cartItem.findIndex(pro => pro.id === product.id) === -1){
            setCartItem(prevState => [...prevState, product])
        } else {
            setCartItem(prevState => {
                return prevState.map((item) => {
                    return item.id === product.id ? {...item, quantity: item.quantity + 1} : item
                })
            })
        }

        toast(`${product.ptitle} added to cart`)
    };


    return (
        <div className='flex-col gap-2 p-1 bg-white pt-6 pb-4 shadow-2x1'>
            <div className='items-center'>
                <h2>{product.ptitle}</h2>
                <p>{product.pdesc}</p>
                <p>{product.pprice}</p>
                <Link className="btn-primary" href={`/${product.id}`}>SeeMore</Link>
                <button className="btn-primary" onClick={addItemToCart}>Add to cart</button>
            </div>
        </div>
    );
};

export default ProductCard;