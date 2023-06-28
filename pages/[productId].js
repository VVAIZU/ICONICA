import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './components/ProductCard';
import Layout from './components/Layout';

const ProductPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);

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
      <ProductCard product={product} />
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
