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
      <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
      {userBalance.totalBudget
        ? <h1 className="text-4xl font-bold text-center">${userBalance.totalBudget}</h1>
        : <p className="text-4xl font-bold text-center">Loading...</p>
}

      </div>
    </body>

  
  )
}
