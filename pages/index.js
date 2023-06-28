import styles from '../styles/Home.module.css'
import NavBar from './components/NavBar'
import { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link";
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [user, setUser] = useState('');
  const [products, setProducts] = useState([]);

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
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };


  return <Layout>
    <div className="text-blue-900 flex justify-beetwen">
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
          </td> */}
        </div>
      ))}
    </div>
  </Layout>
}
