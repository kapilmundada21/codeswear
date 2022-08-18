import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Product from "../../models/Product"
import mongoose from "mongoose";
import { FaEdit, FaSearchPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar';

const Allproduct = ({ products }) => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [product, setProduct] = useState()
    const handelChange = (e) => {
        if (e.target.name == 'search') {
            setSearch(e.target.value)
        }
    }
    const searchProduct = async () => {
        let data = { id: search, searchbyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            setProduct(response.product)
        }
        else {
            toast.error(response.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const deleteProduct = async (productId) => {
        let data = { id: productId, deletebyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/product`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('Product deleted Sucessfully!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push("/dashboard/allproduct")
        }
        else {
            toast.error(response.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        let myAdmin = JSON.parse(localStorage.getItem('myAdmin'))
        try {
          if (!myAdmin) {
            router.push('/')
          }
        } catch (error) {
          if (!myAdmin.token) {
            router.push('/')
          }
        }
      }, [])

    return (
        <>
            <div className='flex'>
                <Sidebar />

                <div className='mx-auto'>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <div className='flex flex-col md:flex-row my-8 mx-4 md:mx-24 justify-between space-y-4 md:space-y-0'>
                        <h1 className='text-xl md:text-2xl font-bold'>All Products</h1>
                        <div className='flex space-x-1'>
                            <input type="search" id="search" name="search" onChange={handelChange} value={search} placeholder='search...' className="w-2/3 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <button onClick={searchProduct} className="text-white bg-indigo-500 border-0 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><FaSearchPlus /> </button>
                        </div>
                    </div>
                    <section className="mx-auto text-gray-600 body-font">
                        <div className="container px-5 -my-8 md:py-4 mx-auto">
                            <div className="flex flex-wrap md:mx-4 -m-4 justify-center">
                                {Object.keys(products).length === 0 && <p className='my-32'>Sorry all the products are currently out of stock. New Stock comming soon. Stay tunned!!</p>}
                                <div className="flex flex-wrap my-8 -m-4">
                                    {!product && Object.keys(products).reverse().map((item) => {
                                        return <div key={products[item]._id} className="p-4 lg:w-1/2 mx-auto">
                                            <div className="shadow-lg p-4 h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                                <div className='space-y-2 transform translate-x-32 md:hidden text-xl font-bold'>
                                                    <Link href={`/dashboard/saveproduct?id=${products[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { deleteProduct(products[item]._id) }} className='text-2xl cursor-pointer -m-1 md:m-0' />
                                                </div>
                                                <img alt="team" className="flex-shrink-0 rounded-lg w-52 h-52 object-cover object-center -mt-8 md:mt-0 sm:mb-0 mb-4" src={products[item].img} />
                                                <div className="flex-grow sm:pl-8">
                                                    <h2 className="title-font font-medium text-lg text-gray-900">ID : {products[item]._id}</h2>
                                                    <h3 className="text-gray-500 mb-1">Category : {products[item].category}</h3>
                                                    <h3 className="text-gray-500 mb-1">Title : {products[item].title}</h3>
                                                    <div className='flex mb-1 space-x-8'>
                                                        <h3 className="text-gray-500">Size : {products[item].size}</h3>
                                                        <h3 className="text-gray-500">Colour : {products[item].color}</h3>
                                                    </div>
                                                    <div className='flex mb-1 space-x-8'>
                                                        <h3 className="text-gray-500">Price : {products[item].price}</h3>
                                                        <h3 className="text-gray-500">Available Quantity : {products[item].availableQty}</h3>
                                                    </div>
                                                    <h3 className="text-gray-500">Slug : {products[item].slug}</h3>
                                                    <p className="mt-2">{products[item].desc}</p>
                                                </div>
                                                <div className='hidden md:block space-y-2 transform md:-translate-y-20 text-xl font-bold'>
                                                    <Link href={`/dashboard/saveproduct?id=${products[item]._id}`} ><a><FaEdit /></a></Link>
                                                    <MdDeleteForever onClick={() => { deleteProduct(products[item]._id) }} className='text-2xl cursor-pointer -m-1' />
                                                </div>
                                            </div>
                                        </div>
                                    })}
                                    {product && <div className="p-4 lg:w-full mx-auto">
                                        <div className="shadow-lg p-4 h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                                            <div className='space-y-2 transform translate-x-32 md:hidden text-xl font-bold'>
                                                <Link href={`/dashboard/saveproduct?id=${product._id}`} ><a><FaEdit /></a></Link>
                                                <MdDeleteForever className='text-2xl cursor-pointer -m-1 md:m-0' />
                                            </div>
                                            <img alt="team" className="flex-shrink-0 rounded-lg w-52 h-52 object-cover object-center -mt-8 md:mt-0 sm:mb-0 mb-4" src={product.img} />
                                            <div className="flex-grow sm:pl-8">
                                                <h2 className="title-font font-medium text-lg text-gray-900">ID : {product._id}</h2>
                                                <h3 className="text-gray-500 mb-1">Category : {product.category}</h3>
                                                <h3 className="text-gray-500 mb-1">Title : {product.title}</h3>
                                                <div className='flex mb-1 space-x-8'>
                                                    <h3 className="text-gray-500">Size : {product.size}</h3>
                                                    <h3 className="text-gray-500">Colour : {product.color}</h3>
                                                </div>
                                                <div className='flex mb-1 space-x-8'>
                                                    <h3 className="text-gray-500">Price : {product.price}</h3>
                                                    <h3 className="text-gray-500">Available Quantity : {product.availableQty}</h3>
                                                </div>
                                                <h3 className="text-gray-500">Slug : {product.slug}</h3>
                                                <p className="mt-2">{product.desc}</p>
                                            </div>
                                            <div className='hidden md:block space-y-2 transform -translate-y-20 text-xl font-bold ml-8'>
                                                <Link href={`/dashboard/saveproduct?id=${product._id}`} ><a><FaEdit /></a></Link>
                                                <MdDeleteForever className='text-2xl cursor-pointer -m-1' />
                                            </div>
                                        </div>
                                    </div>}
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
                
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)

    }
    let products = await Product.find()
    return {
        props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to
    }
}

export default Allproduct