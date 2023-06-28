import Nav from "./Nav.js"

export default function Layout({children}) {
    return (
        //bg-blue-900 min-h-screen flex
        //bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4
        <div className="">
            <Nav />
            <div className="">
                {children}
            </div>
        </div> 
    )
}