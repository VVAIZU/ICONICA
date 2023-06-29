import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import Layout from './components/Layout';
import { useRecoilState } from "recoil";
import { cartState } from '../atoms/cartState';
import { Toast, toast } from 'react-hot-toast';
import styles from '../styles/ProductPage.module.css';

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);


  const [cartItem, setCartItem] = useRecoilState(cartState);

  const addItemToCart = () => {
    if (cartItem.findIndex(pro => pro.id === product.id) === -1) {
      setCartItem(prevState => [...prevState, product])
    } else {
      setCartItem(prevState => {
        return prevState.map((item) => {
          return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        })
      })
    }

    toast(`${product.ptitle} added to cart`)
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.product}>
        <div className={styles.left}>
          <div className={styles.images}>
            <div className={styles.img}>image1</div>
            <div className={styles.img}>image2</div>
          </div>
          <div className={styles.mainImg}>Image Main</div>
        </div>
        <div className={styles.right}>
          <h1>{product.ptitle}</h1>
          <p className={styles.desc}>{product.pdesc}</p>
          <p className={styles.price}>₽ {product.pprice} </p>
          <button className={styles.button} onClick={addItemToCart}>Add to cart</button>
          <div className={styles.info}>
            <span>Vendor: </span>
            <span>Product type: </span>
            <span>Tag: </span>
          </div>
          <hr/>
          <div className={styles.info}>
            <span>ADDITIONAL INFORMATION</span>
            <hr className={styles.myhr}/>
            <span>FAQ</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;


// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// function EditProduct() {
//   const router = useRouter();
//   const { productId } = router.query;
//   const [editProductTitle, setNewProductTitle] = useState('');
//   const [editProductDesc, setNewProductDesc] = useState('');
//   const [editProductPrice, setNewProductPrice] = useState('');

//   useEffect(() => {
//     getProd();
//   }, []);

//   const getProd = () => {
//     axios({
//       method: 'get',
//       data: {
//         productId: productId
//       },
//       withCredentials: true,
//       url: 'http://localhost:3001/getProduct'
//     }).then(res => { setNewProductTitle(res.data.productId) }).catch(err => { console.log(err) });
//   }

//   return (
//     <form>
//       <h2>{product.ptitle}</h2>
//       <p>{product.pdesc}</p>
//       <p>{product.pprice}</p>
//     </form>
//   );
// }

// export default EditProduct;
