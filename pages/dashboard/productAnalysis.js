import React, { useEffect, useState, useRef } from 'react'
import Product from '../../models/product';
import mongoose from "mongoose";
import Sidebar from '../../components/Sidebar';
import { FiDownload } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';
import { FaSearchPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productanalysis = ({ products }) => {
  const [search, setSearch] = useState('')
  const [myproduct, setMyproduct] = useState('')
  const Productanalysis = useRef();
  const handlePrint = useReactToPrint({
    content: () => Productanalysis.current,
  });
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
      setMyproduct(response.product)
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

        <div className='w-full'>
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
          <div className='flex flex-col md:flex-row -mt-3 mb-6 md:my-8 mx-4 md:mx-24 justify-between space-y-4 md:space-y-0'>
            <h1 className='text-xl md:text-2xl font-bold'>Product Analysis</h1>
            <div className='flex md:space-x-8'>
              <div className="flex space-x-1">
                <input type="search" id="search" name="search" onChange={handelChange} value={search} placeholder='search...' className="w-2/3 md:w-full bg-white rounded bproduct bproduct-gray-300 focus:bproduct-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                <button onClick={searchProduct} className="text-white bg-indigo-500 bproduct-0 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><FaSearchPlus /> </button>
              </div>
              <button onClick={handlePrint} className='flex items-center text-white bg-indigo-500 bproduct-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm'><FiDownload className='text-l cursor-pointer mr-1' /> Download</button>
            </div>
          </div>
          <div className="flex flex-col px-8">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <table className="min-w-full" ref={Productanalysis}>
                  <thead className="bg-white bproduct-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-center">
                        Sr.no.
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        product ID
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Category
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Title
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Slug
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Size
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Colour
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Date
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Amount
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Quantity
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(products).length === 0 && <tr><td className='text-center font-semibold' height={100} colSpan={3}>No products</td></tr>}
                    {!myproduct && Object.keys(products).reverse().map((item) => {
                      return <tr key={products[item]._id} className="bg-white bproduct-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {parseInt(item) + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {products[item]._id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {products[item].category}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {products[item].title}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {products[item].slug}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {products[item].size}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {products[item].color}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {new Date(products[item].createdAt).toUTCString()}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 text-center whitespace-nowrap">
                          ₹{products[item].price}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 text-center whitespace-nowrap">
                          {products[item].availableQty}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                          {products[item].desc}
                        </td>
                      </tr>
                    })}
                    {myproduct && <tr key={myproduct._id} className="bg-white bproduct-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {'1'}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {myproduct._id}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {myproduct.category}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {myproduct.title}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {myproduct.slug}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {myproduct.size}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {myproduct.color}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {new Date(myproduct.createdAt).toUTCString()}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 text-center whitespace-nowrap">
                        ₹{myproduct.price}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 text-center whitespace-nowrap">
                        {myproduct.availableQty}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                        {myproduct.desc}
                      </td>
                    </tr>
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
    return;
  }
  let products = await Product.find()

  return {
    props: { products: JSON.parse(JSON.stringify(products)) }, // will be passed to
  }
}

export default Productanalysis