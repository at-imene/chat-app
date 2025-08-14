import React, { useState } from 'react'
import { AtSign, Eye, File, Lock, MessageSquare, PersonStanding, User } from 'lucide-react';

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormDate] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const signup = (e) => {
    e.preventDefault();
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* Left side */}
      <div className='bg-red flex flex-col justify-center items-center'>
        <div className="w-full max-w-md  ">
          <div className="text-center flex flex-col justify-center items-center group gap-2">
            <div className='m-auto size-12 bg-primary/10 rounded-xl flex justify-center items-center group-hover:bg-primary/20 transition-color'>
              <MessageSquare className='size-6' />
            </div>
            <h2 className='text-primary font-extrabold text-xl'>Create Account</h2>
            <p className='text-primary font-extralight text-sm'>Get started with your free account</p>
          </div>

          <form onClick={signup} className='my-6 flex flex-col  w-full gap-4'>
            <div class="">
              <label class="label mb-2">
                <span className='label-text text-sm'>Full Name</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-event-none z-10 '>
                  <User className=' color-white  size-4 text-base-content/50' />
                </div>

                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  className='input input-bordered w-full pl-10 outline-0'
                  value={formData.password}
                  onChange={(e) => setFormDate({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label lb-2">
                <span className='label-text text-sm'>Email</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-event-none z-10 '>
                  <AtSign className=' color-white  size-4 text-base-content/50' />
                </div>

                <input
                  type="email"
                  required
                  placeholder="Email"
                  className='input input-bordered w-full pl-10 outline-0'
                  value={formData.password}
                  onChange={(e) => setFormDate({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label mb-2">
                <span className='label-text text-sm'>Password</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-event-none z-10 '>
                  <Lock className=' color-white  size-4 text-base-content/50' />
                </div>

                <input
                  type="password"
                  required
                  placeholder="Password"
                  className='input input-bordered w-full pl-10 outline-0'
                  value={formData.password}
                  onChange={(e) => setFormDate({ ...formData, password: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 pl-3 flex items-center pointer-event-none-z-10 hover:bg-amber-50/10 hover:cursor-pointer">
                  <Eye className='size-4 text-base-content/50'/>
                </div>
              </div>
            </div>

            <button className='bg-primary py-2 mt-1 rounded-sm font-bold text-sm hover:cursor-pointer hover:bg-primary/80 hover:opacity/20'>Sign Up</button>
            
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className='w-full bg-amber-500'>
        jkjk
      </div>

    </div>
  )
}

export default SignupPage