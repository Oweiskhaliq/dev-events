import React from 'react'
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className='logo'>
                <Image src="/icons/logo.png" alt="logo" width={24} height={24} />

            <p>DevEvent</p>
            </Link>

            <ul>
                <Link href="/">Home</Link>
                  <Link href="/">Events</Link>
                    <Link href="/dashboard/login">Login</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar