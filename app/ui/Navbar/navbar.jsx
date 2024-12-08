"use client"
import "@/styles/navbar.scss"
import { Menu, Person, Search, ShoppingCart } from '@mui/icons-material'
import { colors, IconButton } from '@mui/material'
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

const navbar = () => {
    const { data: session } = useSession();
    const user = session?.user
    const cart = user?.cart

    const [dropdownMenu, setDropdownMenu] = useState(false)
    return (
        <div className='navbar'>
            <a href="/" style={{color: "green"}} >
              Bin HlaigGroup
            </a>
            <div className='navbar_search'>
                <input type='text' placeholder='Search...' />
                <IconButton >
                    <Search sx={{ color: "green" }} />
                </IconButton>
            </div>
            <div className='navbar_right'>
                {user && (
                    <a href="/dashboard/cart" className="cart">
                        <ShoppingCart sx={{ color: "green" }} />
                        Cart <span>({cart?.length})</span>
                    </a>
                )}
                <button className='navbar_right_account' onClick={() => setDropdownMenu(!dropdownMenu)}>
                    <Menu sx={{ color: "gray" }} />
                    {!user ? (
                        <Person sx={{ color: "gray" }} />
                    ) : (
                        <img src={user.profileImagePath} alt='profile' style={{ objectFit: "cover", borderRadius: "50%" }} />
                    )}
                </button>
                {dropdownMenu && !user && (
                    <div className='navbar_right_accountmenu'>
                        <Link href="/login">Log In</Link>
                        <Link href="/register">Sign Up</Link>
                    </div>
                )}
                {dropdownMenu && user && (
                    <div className='navbar_right_accountmenu'>
                        <Link href="/dashboard">home</Link>
                        <Link href="/dashboard/cart">cart</Link>
                        <a onClick="">Log Out</a>
                    </div>
                )}
            </div>
        </div >
    )
}

export default navbar