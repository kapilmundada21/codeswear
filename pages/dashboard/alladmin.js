import Link from 'next/link'
import React, { useState } from 'react'
import Admin from "../../models/admin"
import mongoose from "mongoose";
import { FaEdit, FaSearchPlus } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Sidebar from '../../components/Sidebar';

const Alladmin = ({ admins }) => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [admin, setAdmin] = useState()
    const handelChange = (e) => {
        if (e.target.name == 'search') {
            setSearch(e.target.value)
        }
    }
    const searchadmin = async () => {
        let data = { id: search, searchbyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            setAdmin(response.admin)
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
    const deleteadmin = async (adminId) => {
        let data = { id: adminId, deletebyid: true }
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': ' application/json',
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        if (response.sucess) {
            toast.success('Admin deleted Sucessfully!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            router.push("/dashboard/alladmin")
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

    return (
        <>
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
                <div className='flex flex-col md:flex-row my-8 mx-4 md:mx-24 justify-between space-y-4'>
                    <h1 className='text-xl md:text-2xl font-bold'>All Admins</h1>
                    <div className='flex space-x-1'>
                        <input type="search" id="search" name="search" onChange={handelChange} value={search} placeholder='search...' className="w-2/3 md:w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <button onClick={searchadmin} className="text-white bg-indigo-500 border-0 px-2 focus:outline-none hover:bg-indigo-600 rounded text-xs md:text-sm"><FaSearchPlus /> </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-center">
                                            Sr. no.
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Action
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Admin ID
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Name
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            E-mail
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(admins).length === 0 && <tr><td className='text-center font-semibold' height={100} colSpan={3}>No admins!!</td></tr>}
                                    {!admin && Object.keys(admins).reverse().map((item) => {
                                        return <tr key={admins[item]._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                            <td align='center' className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {parseInt(item) + 1}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <Link href={`/dashboard/saveadmin?id=${admins[item]._id}`} ><a><FaEdit /></a></Link>
                                                <MdDeleteForever onClick={() => { deleteadmin(admins[item]._id) }} className='text-xl cursor-pointer -m-1 mt-2' />
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {admins[item]._id}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {admins[item].name}
                                            </td>
                                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {admins[item].email}
                                            </td>
                                        </tr>
                                    })}
                                    {admin && <tr key={admin._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                        <td align='center' className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {'1'}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <Link href={`/dashboard/saveadmin?id=${admin._id}`} ><a><FaEdit /></a></Link>
                                            <MdDeleteForever onClick={() => { deleteadmin(admin._id) }} className='text-xl cursor-pointer -m-1 mt-2' />
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {admin._id}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {admin.name}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {admin.email}
                                        </td>
                                    </tr>}
                                </tbody>
                            </table>
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
    }
    let admins = await Admin.find()
    return {
        props: { admins: JSON.parse(JSON.stringify(admins)) }, // will be passed to
    }
}

export default Alladmin