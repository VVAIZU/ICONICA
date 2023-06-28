import Layout from "./components/Layout";
import Link from "next/link";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { Toast, toast } from 'react-hot-toast';


export default function adminPanel() {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getProd();
        getUsers();
    }, []);

    //PRODUCTS
    const getProd = () => {
        axios.get('http://localhost:3001/getProducts')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleDelete = (productId, productTitle) => {
        { console.log(productId) }
        toast(`Продукт ${productTitle} успешно удален`)
        axios({
            method: 'post',
            data: {
                productId: productId
            },
            withCredentials: true,
            url: 'http://localhost:3001/products/deleteProduct'
        }).then(() => {
            // Успешное удаление продукта
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    };

    //USERS
    const getUsers = () => {
        axios.get('http://localhost:3001/getUsers')
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleUpdateRole = (userId, userRole) => {
        fetch(`http://localhost:3001/updateUserRole`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, newRole: userRole === 'admin' ? 'user' : 'admin' }), 
            // Замените 'admin' на нужное значение роли
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                 // Результат обновления роли пользователя
                // Вы можете обновить состояние таблицы, если нужно
                window.location.href='/adminPanel';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return <Layout>
        <h1>Products</h1>
        <Link className="btn-primary" href={'/new'}>Add new product</Link>
        <div>
            <h1>Products</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.ptitle}</td>
                            <td>{product.pdesc}</td>
                            <td>{product.pprice} ₽</td>
                            <td>
                                <Link className="btn-primary" href={`edit/${product.id}`}>Edit</Link>
                            </td>
                            <td>
                                <button className="btn-primary" onClick={() => handleDelete(product.id, product.ptitle)}>Delete</button>
                            </td>
                            {/* Add more table cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th></th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn-primary" onClick={() => handleUpdateRole(user.id, user.role)}>Update Role</button>
                            </td>
                            {/* <td>
                                <Link className="btn-primary" href={`/${product.id}`}>Edit</Link>
                            </td>
                            <td>
                                <button className="btn-primary" onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                            Add more table cells as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Layout >
}
