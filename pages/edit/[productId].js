import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function EditProduct() {
    const router = useRouter();
    const { productId } = router.query;
    const [editProductTitle, setNewProductTitle] = useState('');
    const [editProductDesc, setNewProductDesc] = useState('');
    const [editProductPrice, setNewProductPrice] = useState('');

    const updateProduct = async () => {
        axios({
            method: 'put',
            data: {
                ptitle: editProductTitle,
                pdesc: editProductDesc,
                pprice: editProductPrice,
                productId: productId
            },
            withCredentials: true,
            url: "http://localhost:3001/editproduct"
        }).then((res) => {
            window.location.href = '/';
        }).catch((err) => console.log(err))
    };
    // try {
    //   await axios.put(`products/${productId}`, product);
    //   console.log('Product updated successfully');
    //   // Дополнительные действия после успешного обновления продукта
    // } catch (error) {
    //   console.log(error);
    // }

    return (
        <Layout>
            <form>
                <h1>Edit Product</h1>
                <label>Product Name</label>
                <input
                    type="text"
                    placeholder="Product Title"
                    name="ptitle"
                    onChange={e => setNewProductTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                    type="text"
                    placeholder="Product Description"
                    name="pdesc"
                    onChange={e => setNewProductDesc(e.target.value)}
                />
                <label>Price</label>
                <input
                    type="number"
                    placeholder="Product Price"
                    name="pprice"
                    onChange={e => setNewProductPrice(e.target.value)}
                />
                <button type="button" onClick={updateProduct}>
                    Save
                </button>
            </form>
        </Layout>
    );
}

export default EditProduct;
