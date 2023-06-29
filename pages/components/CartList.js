import React from 'react'
import styles from '../../styles/Cart.module.css';

const CartList = ({ data }) => {
    const { ptitle, pdesc, pprice } = data

    return (
        <div className={styles.item}>
            <div>{ptitle}</div>
            <div className={styles.price}>Price: {pprice}</div>
        </div>
    );
};

export default CartList;
