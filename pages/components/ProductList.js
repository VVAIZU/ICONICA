import React from "react";
import { useState, useEffect, useMemo } from 'react';
import styles from "../../styles/ProductList.module.css";
import axios from "axios"
import Link from "next/link";
import Layout from './Layout';
import ProductCard from './ProductCard';


const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [maxPrice, setMaxPrice] = useState(Math.max(...products.map(product => product.price)));
    const [currentMaxPrice, setCurrentMaxPrice] = useState(30000);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [filterChanged, setFilterChanged] = useState(false);

    // Обработчик изменения значения ползунка
    const handleMaxPriceChange = (e) => {
        const newValue = parseInt(e.target.value);
        setCurrentMaxPrice(newValue);
        setFilterChanged(true);
    };

    // Обработчик изменения выбранных категорий
    const handleCategoryChange = (e) => {
        const category = e.target.value;
        const isSelected = e.target.checked;

        if (isSelected) {
            setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, category]);
        } else {
            setSelectedCategories((prevSelectedCategories) =>
                prevSelectedCategories.filter((c) => c !== category)
            );
        }
        setFilterChanged(true);
    };

    // Обработчик изменения выбранного варианта сортировки
    const handleSortOptionChange = (e) => {
        setSortOption(e.target.value);
        setFilterChanged(true);
    };

    // Фильтрация и сортировка продуктов при изменении чекбоксов, ползунка или сортировки
    const filteredAndSortedProducts = useMemo(() => {
        let filteredProducts = products;

        if (filterChanged) {
            filteredProducts = filteredProducts.filter((product) => product.pprice <= currentMaxPrice);
            filteredProducts = filteredProducts.filter((product) =>
                selectedCategories.includes(product.category)
            );
        }

        if (sortOption === "asc") {
            filteredProducts = filteredProducts.sort((a, b) => a.pprice - b.pprice);
        } else if (sortOption === "desc") {
            filteredProducts = filteredProducts.sort((a, b) => b.pprice - a.pprice);
        }

        return filteredProducts;
    }, [products, currentMaxPrice, selectedCategories, sortOption, filterChanged]);

    // Обработчик применения выбранных фильтров и сортировки
    const applyFiltersAndSort = () => {
        setFilterChanged(false);
    };
    // // Обработчик изменения выбранного варианта сортировки
    // const handleSortOptionChange = (e) => {
    //     setSortOption(e.target.value);
    // };


    useEffect(() => {
        const getProd = () => {
            axios.get('http://localhost:3001/getProducts')
                .then(res => {
                    setProducts(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        getProd();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const prices = products.map((product) => product.pprice);
            const max = prices.reduce((acc, price) => Math.max(acc, price), 0);
            setMaxPrice(max);
        }
    }, [products]);

    // // Обработчик изменения значения ползунка
    // const handleMaxPriceChange = (e) => {
    //     const newValue = parseInt(e.target.value);
    //     setCurrentMaxPrice(newValue);
    // };

    // // Обработчик применения выбранного значения
    // const applyMaxPrice = () => {
    //     setMaxPrice(currentMaxPrice);
    // };

    // // Обработчик изменения выбранных категорий
    // const handleCategoryChange = (e) => {
    //     const category = e.target.value;
    //     const isSelected = e.target.checked;

    //     if (isSelected) {
    //         setSelectedCategories((prevSelectedCategories) => [...prevSelectedCategories, category]);
    //     } else {
    //         setSelectedCategories((prevSelectedCategories) => prevSelectedCategories.filter((c) => c !== category));
    //     }
    // };

    // // Фильтруйте продукты на основе выбранных категорий
    // const filteredProducts = products.filter((product) =>
    //     selectedCategories.includes(product.category)
    // );


    // useEffect(() => {
    //     getProd();
    // }, []);

    // const getProd = () => {
    //     axios.get('http://localhost:3001/getProducts')
    //         .then(res => {
    //             setProducts(res.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    return (
        <div className={styles.container}>
            <div className={styles.products}>
                <div className={styles.left}>
                    <div className={styles.filterItem}>
                        <h2 className={styles.myh}>Product categories</h2>
                        <div className={styles.InputItem}>
                            <input
                                type="checkbox"
                                id="1"
                                value="table"
                                checked={selectedCategories.includes("table")}
                                onChange={handleCategoryChange}
                            />
                            <label className={styles.mylabel} htmlFor="1">
                                Table
                            </label>
                        </div>
                        <div className={styles.InputItem}>
                            <input
                                type="checkbox"
                                id="2"
                                value="chair"
                                checked={selectedCategories.includes("chair")}
                                onChange={handleCategoryChange}
                            />
                            <label className={styles.mylabel} htmlFor="2">
                                Chair
                            </label>
                        </div>
                        <div className={styles.InputItem}>
                            <input
                                type="checkbox"
                                id="3"
                                value="deco"
                                checked={selectedCategories.includes("deco")}
                                onChange={handleCategoryChange}
                            />
                            <label className={styles.mylabel} htmlFor="3">
                                Deco
                            </label>
                        </div>
                    </div>
                    <div className={styles.filterItem}>
                        <h2 className={styles.myh}>Filter by price</h2>
                        <span>0</span>
                        <input
                            type="range"
                            min={0}
                            max={maxPrice}
                            value={currentMaxPrice}
                            onChange={handleMaxPriceChange}
                        />
                        <span>{currentMaxPrice}</span>
                    </div>
                    <div className={styles.filterItem}>
                        <h2 className={styles.myh}>Sort by</h2>
                        <div className={styles.InputItem}>
                            <input type="radio" id="asc" value="asc" name="price" onChange={handleSortOptionChange} />
                            <label htmlFor="asc">Price (Lowest first)</label>
                        </div>
                        <div className={styles.InputItem}>
                            <input type="radio" id="desc" value="desc" name="price" onChange={handleSortOptionChange} />
                            <label htmlFor="desc">Price (Highest first)</label>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.top}>
                        <h1>Products</h1>
                    </div>
                    <div className={styles.list}>
                        {filteredAndSortedProducts.map((product) => (
                            <div>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    {/* <div className={styles.list}>
                    {products
                        .filter((product) => product.pprice <= currentMaxPrice) // Фильтрация по максимальной цене
                        .filter((product) => selectedCategories.includes(product.category)) // Фильтрация по выбранным категориям
                        .sort((a, b) => {
                            if (sortOption === "asc") {
                                return a.pprice - b.pprice; // Сортировка по возрастанию цены
                            } else if (sortOption === "desc") {
                                return b.pprice - a.pprice; // Сортировка по убыванию цены
                            } else {
                                return 0; // Без сортировки
                            }
                        })
                        .map((product) => (
                            <div>
                                <ProductCard product={product} />
                            </div>
                        ))}
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default ProductList