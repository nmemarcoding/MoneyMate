import { useEffect,useState } from 'react'
import Navbar from '../../components/Navbar/Navber'
import { publicRequest } from '../../hooks/requestMethods'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {

  const [userBalance, setUserBalance] = useState({})
  const [totalIncome, setTotalIncome] = useState(0)
  // getting user info from local storage and save it in useState
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [weeklyBudget, setWeeklyBudget] = useState(0)
  const [weeklyRemaining, setWeeklyRemaining] = useState(0)
  const navigate = useNavigate();
  // cheack if user is logged in and is not more than 3 days then fetch data from server else navigate to login page
  useEffect(() => {
    if(!user){
      navigate("/login")
    }else{
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


  
  // use effect to calculate current month total income from userBalance
  
  useEffect(() => {
    // getting total income of current month
    if(userBalance.incomes){
      let total = 0
      userBalance?.incomes.forEach((income) => {
        const date = new Date()
        const incomeDate = new Date(income.date)
        if(date.getMonth() === incomeDate.getMonth()){
          total += income.amount
        }
      })
      setTotalIncome(total)
    }
    // calculate daily budget from total income
    // geting tootal of aouto autoExpenses
    let totalAutoExpenses = 0
    userBalance?.autoExpenses?.forEach((autoExpense) => {
      totalAutoExpenses += autoExpense.amount
    })
      
    setWeeklyBudget((totalIncome-totalAutoExpenses)/ 4 )
  }, [userBalance, totalIncome])

  
  // use efect to calculate weekly remaining budget of current week of current month
  useEffect(() => {
    // getting total expense of current week of current month that is not auto expense
    if (userBalance.expenses) {
      const date = new Date();
      const dayOfMonth = date.getDate();
      let total = 0;
  
      userBalance.expenses.forEach((expense) => {
        const expenseDate = new Date(expense.date);
        if (
          expenseDate.getMonth() === date.getMonth() &&
          expense.isAutoExpense === false
        ) {
          if (dayOfMonth <= 7 && expenseDate.getDate() <= 7) {
            total += expense.amount;
            console.log(total);
          } else if (dayOfMonth <= 14 && expenseDate.getDate() > 7 && expenseDate.getDate() <= 14) {
            total += expense.amount;
          } else if (dayOfMonth <= 21 && expenseDate.getDate() > 14 && expenseDate.getDate() <= 21) {
            total += expense.amount;
          } else if (dayOfMonth > 21 && expenseDate.getDate() > 21) {
            total += expense.amount;
          }
        }
      });
  
     
      setWeeklyRemaining(weeklyBudget - total);
    }
  }, [userBalance, weeklyRemaining]);
  
 


  // use effect to set weekly remaining budget to 0 if is last than avalible budget and is not last week of month
  useEffect(() => {
    if(weeklyRemaining > userBalance.totalBudget){
      // cheack if we are in last week of month
      const date = new Date()
      const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
      
      if(date.getDate() + 7 > lastDay.getDate()){
        setWeeklyRemaining(userBalance.totalBudget)
      }else{
        setWeeklyRemaining(0)
      }
    }
  }, [weeklyRemaining, userBalance.totalBudget])


    

  return (
 

    <body class="overflow-hidden">
      <div class="absolute top-0 left-0 right-0">
        <Navbar />
      </div>
      
      <div className='w-full top-1/4 absolute'>
      <h1 className='text-xl text-center text-blue-500 '>{new Date().toDateString()}</h1>
      </div>
     
      
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto">
        
        <div className="bg-white rounded-lg shadow-lg px-8 py-6">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Account Balance</h2>
          <div className="flex items-center mb-4 flex-wrap">
            
            <span className="text-xl ml-2 mb-2">Available Balance:  {userBalance.totalBudget?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            
            {/* adding daily budget */}
            <span className="text-xl ml-2 mb-2">Weekly Budget:  {weeklyBudget?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
            {/* adding daily remaning budget if is more than available blance make red */}
            {weeklyRemaining < 0 ? (
              <span className="text-xl ml-2 " style={{color:"red"}}>
                Weekly Remainings: {weeklyRemaining?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </span>
              ) : (
                <span className="text-xl ml-2">
                  Weekly Remainingss: {weeklyRemaining?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              )}
            <span className="text-green-500 text-sm font-semibold ml-2">{userBalance.availableBalance}</span>
          </div>
        </div>
      </div>
    </body>
  



  
  )
}
