import { useState } from "react";
import Layout from "./components/Layout";
import axios from "axios";

export default function Register() {
    const [registerUsername, setRegisterUsername ] = useState('');
    const [registerPassword, setRegisterPassword ] = useState('');

    const register = () => {
        axios({
            method: "post",
            data: {
                username: registerUsername,
                password: registerPassword
            },
            withCredentials: true,
            url: "http://localhost:3001/register"
        }).then((res) => {
            window.location.href='/';
        })
        .catch((err) => console.log(err));
    }

    return (
        <Layout>
            <div>
                <div>
                    <h1>Register</h1>
                    <input type="text" name="username" placeholder="username" onChange={e => setRegisterUsername(e.target.value)}></input>
                    <input type="password" name="password" placeholder="password" onChange={e => setRegisterPassword(e.target.value)}></input>
                    <button onClick={register}>register</button>
                </div>
            </div>
        </Layout>
    )
}