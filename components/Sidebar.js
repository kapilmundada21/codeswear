import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import Link from 'next/link'
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <>
            <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" charset="utf-8" />
            <style jsx global>{` 
            Footer{display:none} 
            body{
                padding-left:200px;
            }
            #check:checked ~ .sidebar .profile_image{
              transform:translateX(-20px);
            }
            #check:checked~.sidebar label  {
                font-size: 20px;
                margin-left: 135px;
              align-content: center;
              padding-top: 20px;
              padding-bottom: 20px;
              width: 80px;
            }
            #check:checked ~ .sidebar{
                left: -140px;
            }
            #check:checked ~ body{
              padding-left: 0px;
            }
          #check:checked ~ .sidebar a span{
              display: none;
          }
          #check:checked~.sidebar a {
              font-size: 15px;
              margin-left: 135px;
              align-content: center;
              padding-top: 15px;
              padding-bottom: 15px;
              width: 65px;
          }          
          @media screen and (max-width: 780px){
              .sidebar{
                  width: 100%;
                  left: 100%;
                  transition: 1s;
                  transition-property: left;
              }
              .sidebar .profile_image{
                  transform:translateX(0px);
              }
              .sidebar a {
                  padding-top: 10px;
                  text-align: center;
              }
              #check:checked ~ .sidebar{
                  left: 0px;
              }
              #check:checked ~ .sidebar .profile_image{
                  transform:translateX(0px);
              }
              #check:checked ~ .sidebar a span{
                  display: inline-block;
              }
              #check:checked~.sidebar a {
                  margin: 0px;
                  margin-left: -10px;
                  padding-top: 10px;
                  padding-bottom: 0px;
                  width: 100%;
                  font-size: 1em;
                  text-align: center;
                  font-weight: bold;
              }
          }
         `}</style>
            <div>
                <input className='hidden' type="checkbox" id="check" />
                <div className="sidebar bg-[#2f323a] pt-5 fixed left-0 top-16 w-52 h-full">
                    <label htmlFor="check"><FaBars className='cursor-pointer text-[#fff] hover:text-[#19b3d3] bg-[#2f323a] text-xl mx-6 z-10' id="sidebar_btn" /></label>
                    <label htmlFor="check"><i className="fas fa-bars cursor-pointer text-[#fff] hover:text-[#19b3d3] bg-[#2f323a] text-xl mx-6 z-10" id="sidebar_btn"></i></label>
                    <center>
                        <img src="/tshirt.jfif" className="rounded-3xl my-8" height={70} width={70} alt="" />
                    </center>
                    <ul className=''>
                        <Link href={'/dashboard/'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>Dashboard</li></a></Link>
                        <Link href={'/dashboard/allproduct'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>All Products</li></a></Link>
                        <Link href={'/dashboard/saveproduct'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>Add Products</li></a></Link>
                        <Link href={'/dashboard/allusers'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>All Users</li></a></Link>
                        <Link href={'/dashboard/saveuser'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>Add User</li></a></Link>
                        <Link href={'/dashboard/alladmin'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>All Admins</li></a></Link>
                        <Link href={'/dashboard/saveadmin'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>Add Admin</li></a></Link>
                        <Link href={'/dashboard/allorders'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>All Orders</li></a></Link>
                        <Link href={'/dashboard/productAnalysis'}><a><li className='text-[#fff] w-full pl-4 py-2 hover:bg-[#198383]'>Product Analysis</li></a></Link>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar