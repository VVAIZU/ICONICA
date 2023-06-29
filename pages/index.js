import { useState, useEffect, useRef } from "react"
import styles from "../styles/Main.module.css";
import axios from "axios"
import Link from "next/link";
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import { motion } from 'framer-motion';
import ProductList from "./components/ProductList";
import { navVariants, slideIn, staggerContainer, textVariant } from '../utils/motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-cards";

import { EffectCards } from "swiper";

export default function Home() {
  const [user, setUser] = useState('');
  const [products, setProducts] = useState([]);
  const productListRef = useRef(null);

  useEffect(() => {
    getUser();
    getProd();
  }, []);


  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:3001/getUser'
    }).then(res => { setUser(res.data); }).catch(err => { console.log(err) });
  }

  const getProd = () => {
    axios.get('http://localhost:3001/getProducts')
      .then(res => {
        const specialProducts = res.data.filter(product => product.special === 1);
        setProducts(specialProducts);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // <h2 className="text-3xl font-bold mb-4">ICONICA - LOFT FURNITURE</h2>
  // <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus, ex semper tempor vestibulum, </p>

  const scrollToProductList = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <Layout scrollToProductList={scrollToProductList}>
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <motion.nav variants={navVariants} initial="hidden"
            whileInView="show"
            className={`${styles.xPaddings} py-8 relative`}>
            <h2>ICONICA - LOFT FURNITURE</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus, ex semper tempor vestibulum, </p>
          </motion.nav>
          <div className={styles.bottomSection}>
          </div>
        </div>
        <div className={styles.rightSection}>
          <Swiper className={styles.mySwiper} effect={"cards"} grabCursor={true} modules={[EffectCards]}>
            {products.map((product) => (
              <SwiperSlide className={styles.swiper_slide} key={product.id}>
                <div>{product.ptitle}</div>
                <p>{product.pdesc}</p>
                <p>{product.category}</p>
                <Link className={styles.button} href={`/${product.id}`}>SeeMore</Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className={styles.container}>
        <div ref={productListRef}>
          <ProductList></ProductList>
        </div>
      </div>
    </div>
    {/* <div className={styles.top}>
      <h1>Products</h1>
    </div>
    <div>
      {products.map((product) => (
        <div>
          <ProductCard product={product} />
          <td>{product.ptitle}</td>
          <td>{product.pprice} ₽</td>
          <td>
            <Link href={`/${product.id}`}>SeeMore</Link>
          </td>
        </div>
      ))}
    </div> 
    <div className="text-blue-900 flex justify-beetwen">
      <div className='flex justify-center items-center flex-col relative z-10'>
        <motion.nav variants={navVariants} initial="hidden"
          whileInView="show"
          className={`${styles.xPaddings} py-8 relative`}>
          <h2 className="font-extrabold text-[24px] 
                leading-[30px]">ICONICA - LOFT FURNITURE</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque luctus, ex semper tempor vestibulum, </p>
        </motion.nav>
      </div>
    </div>
    <div>
      <div>
        <h1>Home</h1>
        <h1>Logged in user: {user.username}</h1>
        <h1>Role: {user.role}</h1>
      </div>
    </div>
    <div>
      <Link className="btn-primary" href={'/login'}>Login</Link>
      <Link className="btn-primary" href={'/register'}>Register</Link>
    </div>
    <h1>Products</h1>
    <div>
      {products.map((product) => (
        <div>
          <ProductCard product={product} />
          {/* <td>{product.ptitle}</td>
          <td>{product.pprice} ₽</td>
          <td>
            <Link className="btn-primary" href={`/${product.id}`}>SeeMore</Link>
          </td> 
        </div>
      ))}
    </div> */}
  </Layout>
}
