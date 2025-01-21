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


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';

const Header = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsSignedIn(true);
    setIsOpen(false);
    setFormData({ email: '', password: '' });
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='p-3 shadow flex justify-between items-center px-5 bg-white'>
      <img src='/logo.svg' alt="Logo" />
      <div>
        {isSignedIn ? (
          <Button 
            onClick={handleSignOut} 
            variant="outline"
            className="hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Sign out
          </Button>
        ) : (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">Sign in</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-6 bg-white rounded-xl shadow-xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-gray-800">
                  Welcome Back
                </DialogTitle>
                <p className="text-center text-gray-600 mt-2">
                  Please sign in to continue
                </p>
              </DialogHeader>
              <form onSubmit={handleSignIn} className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="pl-10 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </button>
                </div>
                <div className="pt-2">
                  <Button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Sign in
                  </Button>
                </div>
                <div className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign up
                  </button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default Header;


