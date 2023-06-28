import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/cartState";


export default function Nav() {
    const [cartItem] = useRecoilState(cartState)

    const [user, setUser] = useState('');
    const inactiveLink = "flex-col gap-2 p-1";
    const activeLink = inactiveLink + " bg-white text-blue-900 rounded-1-lg";

    useEffect(() => {
        getUser();
    }, []);


    const getUser = () => {
        axios({
            method: 'get',
            withCredentials: true,
            url: 'http://localhost:3001/getUser'
        }).then(res => { setUser(res.data); }).catch(err => { console.log(err) });
    }

    const router = useRouter();
    const { pathname } = router;
    return (
        <div>
            <Link href={'/'}>Home</Link>
            {user.role === 'admin' && (
                <Link href={'/adminPanel'}>AdminPanel</Link>
            )}
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'}>Register</Link>
            <Link href={'/cart'}>Cart {cartItem.length}</Link>
        </div>
    );
}