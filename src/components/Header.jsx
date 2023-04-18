import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className='flex align-center'>
        <h1>Once Typed</h1>
        <nav>
            <ul className='flex align-center space-between'>
                <Link to={"/"} style={{ textDecoration: 'none' }}><li>Home</li></Link>
                <Link to={"/history"} style={{ textDecoration: 'none' }}><li>Your Notebook</li></Link>
                <Link to={"/add-prompts"} style={{ textDecoration: 'none' }}><li>Add Prompts</li></Link>
                {/* <Link to={"/about"} style={{ textDecoration: 'none' }}><li>About</li></Link> */}
            </ul>
        </nav>
    </header>
  )
}

export default Header