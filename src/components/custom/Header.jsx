/*
time - 3:11:25
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
import React, { useState } from 'react';
import { Button } from '../ui/button';
import axios from "axios";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setIsLogin(true);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3001/login', { email, password });
      console.log(result);

      if (result.data === "Login Successful") {
        setIsLoggedIn(true);
        closeModal();
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/register', { name, email, password });
      console.log(result);

      if (result.data) {
        console.log(result.data);
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  const handleSignOut = () => {
    console.log('User signed out');
    setIsLoggedIn(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className='p-3 shadow flex justify-between items-center px-5'>
      <img src='/logo.svg' alt="Logo" />
      <div>
        {isLoggedIn ? (
          <Button onClick={handleSignOut}>Sign out</Button>
        ) : (
          <Button onClick={openModal}>Sign in</Button>
        )}
      </div>

      {isModalOpen && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    autoComplete="off"
                    name="email"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                    required
                  />
                </div>
              )}
              <div className="flex justify-between items-center mb-4">
                <Button type="button" onClick={toggleForm} className="text-blue-500 underline">
                  {isLogin ? 'Need to register?' : 'Already have an account?'}
                </Button>
                <div>
                  <Button type="button" onClick={closeModal} className="mr-2">Cancel</Button>
                  <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
