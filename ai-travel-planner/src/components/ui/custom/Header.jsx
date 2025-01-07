import React from 'react'

const Header = () => {
  return (
    <div className='p-2 shadow flex justify-between items-center px-5'>
        <img src='/logo.svg'/>
        <div>
            <button>Sign In</button>
        </div>
    </div>
  )
}

export default Header