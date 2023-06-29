import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"
import axios from "axios"
import { useRecoilState } from "recoil";
import { cartState } from "../../atoms/cartState";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from '../../styles/NavBar.module.css';
import Cart from "./Cart";

const Nav = ({ scrollToProductList }) => {
    const [cartItem] = useRecoilState(cartState)
    const [open, setOpen] = useState(false);
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
        <div className={styles.navbar}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.item}>
                        <Link className={styles.logo} href='/'>ICONICA</Link>
                    </div>
                    <div className={styles.item}>
                        <Link className={styles.link} href='/'>HOME</Link>
                    </div>
                    <div className={styles.item}>
                        <button className={styles.button} onClick={scrollToProductList}>PRODUCTS</button>
                    </div>
                    <div className={styles.item}>
                        {user.role === 'admin' && (
                            <Link className={styles.link} href='/adminPanel'>ADMIN PANEL</Link>
                        )}
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.icons}>
                        <Link className={styles.link} href="/login"><AccountCircleIcon /></Link>
                        <div className={styles.cartIcon}>
                            <button className={styles.cartIcon} onClick={() => setOpen(!open)}><ShoppingCartIcon /><span className={styles.mySpan}>{cartItem.length}</span></button>
                        </div>
                    </div>
                </div>
            </div>
            {open && <Cart />}
        </div>
        // <nav>
        //     <div className={`${styles.innerWidth} 
        //     mx-auto flex justify-between gap-8`}>
        //         <h2 className="font-extrabold text-[24px] 
        //         leading-[30px]">ICONICA</h2>
        //         <Link href={'/'} className="text-[20px]">HOME</Link>
        //         {user.role === 'admin' && (
        //             <Link href={'/adminPanel'}>ADMIN PANEL</Link>
        //         )}
        //         <Link href={'/login'} className="text-[20px]" >Login</Link>
        //         <Link href={'/register'} className="text-[20px]">REGISTER</Link>
        //         <Link href={'/cart'} className="text-[20px]">Cart</Link>

        //     </div>
        // </nav>
    );
}

export default Nav;