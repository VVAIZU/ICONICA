import { useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";

export default function Login() {
    const [loginUsername, setLoginUsername ] = useState('');
    const [loginPassword, setLoginPassword ] = useState('');

    const login = () => {
        axios({
            method: 'post',
            data: {
                username: loginUsername,
                password: loginPassword
            },
            withCredentials: true,
            url: 'http://localhost:3001/login'
        }).then((res) => {
            window.location.href='/';
        })
        .catch((err) => console.log(err));
    }

    return (
        <Layout>
            <div>
                <div>
                    <h1>login</h1>
                    <input type="text" name="username" placeholder="username" onChange={e => setLoginUsername(e.target.value)}></input>
                    <input type="password" name="password" placeholder="password" onChange={e => setLoginPassword(e.target.value)}></input>
                    <button className="btn-primary" onClick={login}>login</button>
                </div>
            </div>
        </Layout>
    )
}