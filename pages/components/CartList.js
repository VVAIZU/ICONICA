import React from 'react'
import styles from '../../styles/Cart.module.css';

const CartList = ({ data, removeFromCart }) => {
    const { ptitle, pdsc, pprice, id } = data

    return (
        <div className={styles.item}>
            <div>{ptitle}</div>
            <div className={styles.price}>Price: {pprice}</div>
            <button className={styles.removeButton} onClick={() => removeFromCart(id)}>
                Remove
            </button>
        </div>
    );
};

export default CartList;
