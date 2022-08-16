import React, { useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import { useRouter } from 'next/router'

const Dashboard = () => {
  const router = useRouter();
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
  }, [router.query])

  return (
    <>
      <div className='flex'>
        <Sidebar />

      </div>
    </>
  )
}

export default Dashboard