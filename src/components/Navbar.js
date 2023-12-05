import React from "react"
import Authentication from "./Authentication"
import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-logo">
            <img src ="/Images/logo.png" alt="windyroad"/>
            </Link>
        <ul>
            <Authentication/>  
        </ul>
        </nav>
    )
}

function CustomLink({to, children, ...props}){
const resolvedPath = useResolvedPath(to)  
const isActive = useMatch({ path : resolvedPath.pathname, end: true}) 
    return (
        <li className={isActive ? "active" : ""}>
            <Link to = {to} {...props}>
                {children}
            </Link>
        </li>
    )
}
  