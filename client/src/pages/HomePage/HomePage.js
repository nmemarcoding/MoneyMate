import { useEffect,useState } from 'react'
import Navbar from '../../components/Navbar/Navber'
import { publicRequest } from '../../hooks/requestMethods'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {

  const [userBalance, setUserBalance] = useState({})
  // getting user info from local storage and save it in useState
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  
  const navigate = useNavigate();
  // cheack if user is logged in and is not more than 3 days then fetch data from server else navigate to login page
  useEffect(() => {

    if(!user){
      navigate("/login")
    }else{
      console.log(user)
      const date = new Date(user.date)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const days = diff / (1000 * 3600 * 24)
      if(days > 3){
        localStorage.removeItem("user")
        navigate("/login")
      }else{
       
        publicRequest(user.accessToken).get("budget/totalBudget")
        .then((res) => {
          // save user info with current date includedin local storage
          localStorage.setItem("budget",JSON.stringify({...res.data, date: new Date()}))
          setUserBalance(res.data)
      
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  }, [user])



  return (
 

    <body class="overflow-hidden">
      <div class="fixed top-0 left-0 right-0">
        <Navbar />
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg px-8 py-6">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Account Balance</h2>
          <div className="flex items-center mb-4">
            <div className="bg-green-500 rounded-full h-4 w-4"></div>
            <span className="text-xl ml-2">Available Balance: {userBalance.totalBudget}</span>
            <span className="text-green-500 text-sm font-semibold ml-2">${userBalance.availableBalance}</span>
          </div>
        </div>
      </div>
    </body>
  



  
  )
}
