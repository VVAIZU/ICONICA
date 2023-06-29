import { useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";

export default function NewProduct() {
    const [ registerProductTitle, setProductTitle ] = useState('');
    const [ registerProductDesc, setProductDesc ] = useState('');
    const [ registerProductPrice, setProductPrice ] = useState('');

    const addProduct = () => {
        axios({
            method: "post",
            data: {
                ptitle: registerProductTitle,
                pdesc: registerProductDesc,
                pprice: registerProductPrice
            },
            withCredentials: true,
            url: "http://localhost:3001/new"
        }).then((res) => {
            window.location.href='/';
        })
        .catch((err) => console.log(err));
    }

    return (
        <Layout>
            <form>
                <h1>New Product</h1>
                <label>Product name</label>
                <input type="text" 
                placeholder="ptitle" 
                name="ptitle"
                onChange={e => setProductTitle(e.target.value)}/>
                <label>Description</label>
                <textarea type="text" 
                placeholder="pdesc" 
                name="pdesc"
                onChange={e => setProductDesc(e.target.value)}/>
                <label>Price</label>
                <input type="number" 
                placeholder="pprice" 
                name="pprice"
                onChange={e => setProductPrice(e.target.value)}/>
                <button onClick={addProduct} type="submit">Save</button>
            </form>
        </Layout>
    ); 
}