import { useState } from 'react'
import { publicRequest } from '../../hooks/requestMethods'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navber';

export default function Login() {
    const [cordentials, setCordentials] = useState({username:"",password:""})
    const navigate = useNavigate();

    // function to handel change input and set the to cordentials
    const handleChange = (e) => {
        const {id,value} = e.target
        setCordentials({...cordentials,[id]:value})

    }

    // function to handel Login
    const handleLogin = () => {
        publicRequest().post("auth/login",cordentials)
        .then((res) => {

            // save user info with current date includedin local storage
            localStorage.setItem("user",JSON.stringify({...res.data, date: new Date()})) 
            navigate('/');

        })
        .catch((err) => {
          
            window.alert(err.response.data)
        })
    }



  return (
    <>
   <div class="fixed top-0 left-0 right-0">
        <Navbar />
    </div>
    <div class="flex items-center justify-center h-screen bg-gray-800">
        
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
              Username
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={handleChange}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={handleChange}/>
            
          </div>
          <div class="flex flex-col items-center">
           <div class="flex justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="button" onClick={handleLogin}>
              Sign In
            </button>
            <div class="ml-4"></div>
            <Link to="/signup">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="button" href="/">
                    Sign Up
                </button>
            </Link>
          </div>
            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
