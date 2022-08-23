import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BsCartPlusFill, BsFillCartCheckFill } from 'react-icons/bs';
import { AiFillCloseCircle, AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ adminLogout, logout, admin, user, cart, addToCart, clearCart, removeFromCart, subtotal }) => {
    const ref = useRef();
    const refSidebar = useRef();
    const [dropdown, setDropdown] = useState(false)
    let toggleCart = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full");
            ref.current.classList.add("translate-x-0");
        }
        else if (ref.current.classList.contains("translate-x-0")) {
            ref.current.classList.remove("translate-x-0");
            ref.current.classList.add("translate-x-full");
        }
    }
    let toggleSidebar = () => {
        if (refSidebar.current.classList.contains("-translate-x-full")) {
            refSidebar.current.classList.remove("-translate-x-full");
            refSidebar.current.classList.add("translate-x-0");
        }
        else if (refSidebar.current.classList.contains("translate-x-0")) {
            refSidebar.current.classList.remove("translate-x-0");
            refSidebar.current.classList.add("-translate-x-full");
        }
    }
    const toggleDropdown = () => {
        if (dropdown) { setDropdown(false) }
        else { setDropdown(true) }
    }
    return (
        <div className='md:flex p-4 shadow-md fixed top-0 right-0 w-[99vw] bg-white z-10'>
            <div className="logo flex items-center">
                {admin.token && <FaBars onClick={toggleSidebar} className='md:hidden mx-2 cursor-pointer' />}
                <Link href="/"><a><Image src="/vercel.svg" height={20} width={100} alt="logo"></Image></a></Link>
            </div>
            <div className="nav">
                <ul className='flex text-center space-x-3 justify-center mt-2 md:mt-0 md:ml-20 md:space-x-4'>
                    <Link href="/"><a><li>Home</li></a></Link>
                    <Link href="/"><a><li>About</li></a></Link>
                    <Link href="/tshirts"><a><li>T-Shirts</li></a></Link>
                    <Link href="/contactus"><a><li>Contact Us</li></a></Link>
                    {admin.token && <Link href="/dashboard"><a><li>Dashboard</li></a></Link>}
                </ul>
            </div>
            <div ref={ref} className="flex space-x-2 md:space-x-6 cart items-center absolute right-4 md:right-7 top-4 md:text-lg">
                <span onClick={toggleDropdown} onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
                    {user.token && <MdAccountCircle className='md:text-xl cursor-pointer' />}
                    {dropdown && <div className="absolute right-5 top-5 bg-white shadow-lg border font-semibold rounded-md text-sm px-4 w-28">
                        <ul>
                            <Link href="/myaccount"><a><li className='py-2 '>My Account</li></a></Link>
                            <Link href="/orders"><a><li className='py-2 '>Orders</li></a></Link>
                            <li onClick={logout} className='py-2 '>Logout</li>
                        </ul>
                    </div>}
                </span>
                {admin.token && <button onClick={adminLogout} className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><a>Logout</a></button>}
                {(!user.token && !admin.token) && <Link href={'/adminlogin'}><a><button className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm">Admin</button></a></Link>}
                {(!user.token && !admin.token) && <Link href={'/login'}><a><button className="text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm">Login</button></a></Link>}
                <BsCartPlusFill onClick={toggleCart} className='cursor-pointer' />
            </div>
            <div ref={refSidebar} className="w-52 p-4 h-[100vh] absolute top-24 md:top-16 left-0 bg-white shadow-xl z-10 transform transition-transform -translate-x-full">
                <ul className=''>
                    <Link href={'/dashboard/'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>Dashboard</li></a></Link>
                    <Link href={'/dashboard/allproduct'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>All Products</li></a></Link>
                    <Link href={'/dashboard/saveproduct'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>Add Products</li></a></Link>
                    <Link href={'/dashboard/allusers'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>All Users</li></a></Link>
                    <Link href={'/dashboard/saveuser'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>Add User</li></a></Link>
                    <Link href={'/dashboard/alladmin'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>All Admins</li></a></Link>
                    <Link href={'/dashboard/saveadmin'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>Add Admin</li></a></Link>
                    <Link href={'/dashboard/allorders'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>All Orders</li></a></Link>
                    <Link href={'/dashboard/productAnalysis'}><a><li className='w-full pl-4 py-2 hover:bg-indigo-400'>Product Analysis</li></a></Link>
                </ul>
            </div>
            <div ref={ref} className="shopCart absolute top-0 right-0 w-74 h-[100vh] transform transition-transform translate-x-full bg-[#ebeaea] shadow-xl p-10">
                <AiFillCloseCircle className='absolute top-5 right-4 text-xl cursor-pointer' onClick={toggleCart} />
                <h1 className='font-bold text-center'>Shop Cart</h1>
                <ol className='list-decimal mt-4'>
                    {Object.keys(cart).length == 0 && <div>Your Cart is Empty!</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className='item flex'>
                                <div className='w-2/3'>{cart[k].name} ({cart[k].size},{cart[k].variant})</div>
                                <div className='w-1/3 flex items-center justify-center text-lg'><AiFillMinusCircle className='cursor-pointer' onClick={() => { removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle className='cursor-pointer' onClick={() => { addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} /></div>
                                {/* <div className="w-1/5 ml-2 mt-0.5">{cart[k].price}</div>
                                <div className="w-1/5 mt-0.5">{cart[k].price + '*' + cart[k].qty + ' = ' + ((cart[k].price)*(cart[k].qty))}</div> */}

                            </div>
                        </li>
                    })}

                </ol>
                <div className="my-2 mt-6 font-bold">Subtotal : ₹{subtotal}</div>
                <div className='flex'>
                    <Link href={'/checkout'}><a><button className="flex mx-auto text-white items-center bg-indigo-500 border-0 py-2 px-2  md:px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"><BsFillCartCheckFill className='mr-2' /> Checkout</button></a></Link>
                    <button onClick={clearCart} type="button" className="flex mx-auto text-white items-center bg-indigo-500 border-0 py-2 px-3 md:px-4 ml-4 focus:outline-none hover:bg-indigo-600 rounded text-sm">Clear</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar