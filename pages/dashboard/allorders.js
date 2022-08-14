import React, { useEffect, useState } from 'react'
import Order from '../../models/order';
import mongoose from "mongoose";
import Link from 'next/link'
import Sidebar from '../../components/Sidebar';

const Allorders = ({ orders }) => {
  return (
    <>
    <Sidebar />
    <div className='container mx-auto'>
      <h1 className='text-xl md:text-2xl font-bold py-6 ml-16'>My Orders</h1>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-center">
                    Sr.no.
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                    Order ID
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                    Status
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                    Date
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                    Amount
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-3 py-4 text-left">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(orders).length === 0 && <tr><td className='text-center font-semibold' height={100} colSpan={3}>No Orders</td></tr>}
                {Object.keys(orders).reverse().map((item) => {
                    return <tr key={orders[item]._id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                    <td align='center' className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                      {parseInt(item) + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                      {orders[item]._id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                      {orders[item].status}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                      {new Date(orders[item].createdAt).toUTCString()}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                      {orders[item].amount}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                      <Link href={`/order?id=${orders[item]._id}`}><a>details</a></Link>
                    </td>
                  </tr>
                })}

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
    return;
  }
  let orders = await Order.find()

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) }, // will be passed to
  }
}

export default Allorders