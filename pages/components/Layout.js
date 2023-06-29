import Nav from "./Nav.js"
import Footer from "./Footer.js"

export default function Layout({ children }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Nav />
            <div style={{ flex: 1 }}>
                {children}
            </div>
            <Footer />
        </div>
    );
}