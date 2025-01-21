/*
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate, useNavigation } from 'react-router-dom';


const Header = () => {

  const users = localStorage.getItem('user');
  useEffect(() => {

  }, [])


  return (
    <div className='p-3 shadow flex justify-between items-center px-5'>
      <img src='/logo.svg' />
      <div>
        {user ?
          <div className='flex items-center gap-3'>
            <Button variant="outline" className="rounded-full">My Trips</Button>
            <Popover>
              <PopoverTrigger> <img src={user?.picture} className='h-[35px] w-[35px] rounded-full' /></PopoverTrigger>
              <PopoverContent>
                <h2 className='curser-pointer' onClick={() => {
                  goolgleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2></PopoverContent>
            </Popover>
          </div> : <Button>Sign in</Button>}
      </div>
    </div>
  )
}

export default Header
*/


import React, { useEffect } from 'react'
import { Button } from '../ui/button'

const Header = () => {

  return (
    <div className='p-3 shadow flex justify-between items-center px-5'>
      <img src='/logo.svg' />
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  )
}

export default Header


