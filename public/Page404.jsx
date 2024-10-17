import React from 'react'

const Page404 = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center text-center text-customRed text-5xl'>
        <div>
            <h1 className='uppercase'>page not found</h1>
            <p className='text-white text-xs my-5'>Invalid URL</p>
        </div>
    </div>
  )
}

export default Page404