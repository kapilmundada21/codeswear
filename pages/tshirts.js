// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Product from "../models/product"
import mongoose from "mongoose";

const Tshirts = ({ products }) => {
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-8 md:py-24 mx-auto">
                    <div className="flex flex-wrap -m-4 justify-center">
                        {Object.keys(products).length === 0 && <p>Sorry all the products are currently out of stock. New Stock comming soon. Stay tunned!!</p>}
                        {Object.keys(products).map((item) => {
                            return <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5" key={products[item]._id}>
                                <Link href={`/product/${products[item].slug}`}><a className="block relative h-15 rounded overflow-hidden">
                                    <img alt="ecommerce" className="m-auto md:mx-0 h-[30vh] md:h-[36vh] block" src={products[item].img} />                                
                                    <h3 className="mt-4 text-gray-500 text-xs tracking-widest title-font mb-1">{products[item].category}</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                                    </a></Link>
                                <div>
                                    <p className="mt-1">₹{products[item].price}</p>
                                    <div className="mt-1">
                                        {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                                        {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                                        {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L </span>}
                                        {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                                        {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                                    </div>
                                    <div className="mt-1">
                                        {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                                        {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 t focus:outline-none"></button>}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)

    }
    let products = await Product.find({category : "T-Shirt"})
    let tshirt = {}
    for (let items of products) {
        if (items.title in tshirt) {
            if (!tshirt[items.title].color.includes(items.color) && items.availableQty > 0) {
                tshirt[items.title].color.push(items.color)
            }
            if (!tshirt[items.title].size.includes(items.size) && items.availableQty > 0) {
                tshirt[items.title].size.push(items.size)
            }
        }
        else {
            tshirt[items.title] = JSON.parse(JSON.stringify(items))
            if (items.availableQty > 0) {
                tshirt[items.title].size = [items.size]
                tshirt[items.title].color = [items.color]
            }
            else{
                tshirt[items.title].size = []
                tshirt[items.title].color = []
            }
        }
    }
    return {
        props: { products: JSON.parse(JSON.stringify(tshirt)) }, // will be passed to
    }
}

export default Tshirts