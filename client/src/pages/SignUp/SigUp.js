import { useState } from 'react'
import { publicRequest } from '../../hooks/requestMethods'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navber'


export default function SigUp() {
    const [cordentials, setCordentials] = useState({username:"",email:"",password:""})
    const navigate = useNavigate()
    // function to handel change input and set the to cordentials
    const handleChange = (e) => {
        const {id,value} = e.target
        setCordentials({...cordentials,[id]:value})
        console.log(cordentials)
    }

    // function to handel sign up
    const handleSignUp = () => {
        publicRequest().post("auth/register",cordentials)
        .then((res) => {
            console.log(res)
            navigate('/login');
            

        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
        <div class="fixed top-0 left-0 right-0">
        <Navbar />
        </div>
        <div class="flex items-center justify-center h-screen bg-gray-800">
            <div className="w-full max-w-md px-4 ">
                <h1 class="text-3xl font-bold text-white text-center mb-4">Sign Up</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">          
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter your username" onChange={handleChange}/>
                    </div>
                    <div className="mb-4">          
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" onChange={handleChange}/>
                    </div>
                    <div className="mb-4">                
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter your password" onChange={handleChange}/>
                    </div>
                    
                    <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSignUp} onSubmit={handleChange}>
                        Sign Up
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </>
  )
}
