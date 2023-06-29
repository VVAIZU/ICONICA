import React from "react";
import styles from '../../styles/Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.item}>
                    <div className={styles.myhf}>Categories</div>
                    <span>Category1</span>
                    <span>Category1</span>
                    <span>Category1</span>
                    <span>Category1</span>
                    <span>Category1</span>
                </div>
                <div className={styles.item}>
                    <div className={styles.myhf}>Categories</div>
                    <span>Category1</span>
                    <span>Category1</span>
                    <span>Category1</span>
                    <span>Category1</span>
                    <span>Category1</span>
                </div>
                <div className={styles.item}>
                    <div className={styles.myhf}>About</div>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum
                        quis ex tempor tristique. Aliquam vitae consequat erat, at tristique tortor.
                        Nullam dictum a nunc sed volutpat. Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.
                    </span>
                </div>
                <div className={styles.item}>
                    <div className={styles.myhf}>Contacts</div>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas interdum
                        quis ex tempor tristique. Aliquam vitae consequat erat, at tristique tortor.
                        Nullam dictum a nunc sed volutpat. Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.
                    </span>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <span className={styles.logo}>ICONICA</span>
                    <span className={styles.copyright}>© 2023 Copyright. All rights reserved</span>
                </div>
                <div className={styles.right}>
                    <span>social icons</span>
                </div>
            </div>
        </div>
    );
}