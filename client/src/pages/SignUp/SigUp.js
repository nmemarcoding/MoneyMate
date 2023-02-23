import React from 'react'

export default function SigUp() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
    <div className="w-full max-w-md px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">Sign Up</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">          
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter your name" />
        </div>
        <div className="mb-4">          
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="mb-4">                
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" />
        </div>
        <div className="mb-6">              
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password2" type="password" placeholder="Confirm your password" />
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>

  )
}
