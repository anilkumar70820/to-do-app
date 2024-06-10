import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className='container max-w-[1140px] mx-auto px-5 py-5'>
        <Link href={"/todo"}>
    <button className='px-6 py-3 leading-[150%] text-xl font-bold font-mono text-white rounded-xl bg-black border border-transparent hover:border-black hover:text-black duration-300 hover:bg-white'>
        To Do
    </button>
    </Link>
</div>
  )
}

export default HomePage