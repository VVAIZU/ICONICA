import React from "react";
import { useState, useEffect } from "react"
import styles from "../../styles/ProductList.module.css";
import axios from "axios"
import Link from "next/link";
import Layout from './Layout';
import ProductCard from './ProductCard';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000);

    useEffect(() => {
        getProd();
    }, []);

    const getProd = () => {
        axios.get('http://localhost:3001/getProducts')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className={styles.products}>
            <div className={styles.left}>
                <div className={styles.filterItem}>
                    <h2 className={styles.myh}>Product categories</h2>
                    <div className={styles.InputItem}>
                        <input type="checkbox" id="1" value={1} />
                        <label className={styles.mylabel} htmlFor="1">Shoes</label>
                    </div>
                    <div className={styles.InputItem}>
                        <input type="checkbox" id="2" value={1} />
                        <label className={styles.mylabel} htmlFor="2">Skirts</label>
                    </div>
                    <div className={styles.InputItem}>
                        <input type="checkbox" id="3" value={1} />
                        <label className={styles.mylabel} htmlFor="3">Coats</label>
                    </div>
                </div>
                <div className={styles.filterItem}>
                    <h2 className={styles.myh}>Filter by price</h2>
                    <span>0</span>
                    <input type="range" min={0} max={1000} onChange={(e) => setMaxPrice(e.target.value)} />
                    <span>{maxPrice}</span>
                </div>
                <div className={styles.filterItem}>
                    <h2 className={styles.myh}>Sort by</h2>
                    <div className={styles.InputItem}>
                        <input type="radio" id="asc" value="asc" name="price" />
                        <labe htmlFor="asc">Price (Lowest first)</labe>
                    </div>
                    <div className={styles.InputItem}>
                        <input type="radio" id="desc" value="desc" name="price" />
                        <labe htmlFor="desc">Price (Highest first)</labe>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.top}>
                    <h1>Products</h1>
                </div>
                <div className={styles.list}>
                    {products.map((product) => (
                        <div>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList