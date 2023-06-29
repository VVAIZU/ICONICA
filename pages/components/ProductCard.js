import React from 'react';
import { useRecoilState } from "recoil";
import styles from '../../styles/ProductCard.module.css';
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
        <div className={styles.card}>
            <div>
                <h2>{product.ptitle}</h2>
                <p>{product.pdesc}</p>
                <p>{product.category}</p>
                <p className={styles.price}>{product.pprice}</p>
                <Link href={`/${product.id}`}>SeeMore</Link>
                <button onClick={addItemToCart}>Add to cart</button>
            </div>
        </div>
    );
};

export default ProductCard;