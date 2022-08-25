import React, { useEffect, useState } from 'react'
import Order from '../models/order';
import mongoose from "mongoose";
import Link from 'next/link'
import { useRouter } from 'next/router'

let myOrder = [];
let flag = false;
const Orders = ({ order }) => {
  const router = useRouter()
  useEffect(() => {
    const myUser = JSON.parse(localStorage.getItem('myUser'))
    try {
      if (!myUser) {
        router.push('/')
      }
    } catch (error) {
      if (!myUser.token) {
        router.push('/')
      }
    }
    try {
      for (let i = 0; i < order.length; i++) {
        const element = order[i];
        if (element.email == myUser.email) {
          myOrder[i] = order[i];
          flag = true;
        }
      }
      myOrder.reverse()
    } catch (error) {

    }
  }, [])
  return (
    <div className='container mx-auto min-h-screen'>
      <h1 className='text-2xl font-bold text-center -mt-4 mb-4 md:mt-8 md:mb-6'>My Orders</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 mx-4 lg:px-8">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Order ID
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Status
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Amount
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Date
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {!flag && <tr><td className='text-center font-semibold' height={50} colSpan={4}>No Orders</td></tr>}
                {myOrder.map((item) => {
                  return <tr key={item._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item._id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.status}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.amount}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {new Date(item.createdAt).toDateString()}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <Link href={`/order?id=${item._id}`}><a>details</a></Link>
                    </td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
    return;
  }
  let orders = await Order.find()

  return {
    props: { order: JSON.parse(JSON.stringify(orders)) }, // will be passed to
  }
}

export default Orders