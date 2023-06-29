import Nav from "./Nav.js"
import React from "react";
import Footer from "./Footer.js"
import styles from "../../styles/Layout.module.css";

export default function Layout({ scrollToProductList, children }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <div className={styles.nav}>
                <Nav scrollToProductList={scrollToProductList} />
            </div>
            <div style={{ flex: 1, paddingTop: 60 }}>
                {children}
            </div>
            <Footer />
        </div>
    );
}