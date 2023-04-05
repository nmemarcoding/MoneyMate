import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { useEffect, useState } from 'react';
import SigUp from './pages/SignUp/SigUp';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import IncomePage from './pages/IncomesPage/IncomePage';
import AutoExpensePage from './pages/AutoExpensPage/AutoExpensePage';
import ExpensesPage from './pages/ExpensesPage/ExpensesPage';
import { publicRequest } from './hooks/requestMethods';


function App() {
  const [serveIsRunning, setServeIsRunning] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    publicRequest().get("/start")
      .then((res) => {
        setServeIsRunning(true)
        // if user is more than 3 days than remove it from local storage and set user to null
        if(user){
          const date = new Date(user.date)
          const now = new Date()
          const diff = now.getTime() - date.getTime()
          const days = diff / (1000 * 3600 * 24)
          if(days > 3){
            localStorage.removeItem("user")
            setUser(null)
          }
        }
       
      })
      .catch((err) => {
        console.log(err)
        
        setServeIsRunning(false)
      })
  }, [])
  console.log(serveIsRunning)
  
 
  
  if(!serveIsRunning){
    return <div class="flex items-center justify-center h-screen">
    <div class="app">
      <h1 class="animate-pulse animate-slow text-4xl font-bold text-center">MONEYMATE</h1>
    </div>
  </div>
  
  

  }
  else{
 return <Router>
          <div className="app ">
            <Routes>
              
                  
              <Route path="/signup" element={<SigUp/>}/>
              <Route path="/login" element={<Login/>}/> 
              {user && <Route path="/home" element={<HomePage/>}/>}
              {user && <Route path="/incomes" element={<IncomePage/>}/>}
              {user && <Route path="/autoexpenses" element={<AutoExpensePage/>}/>}
              {user && <Route path="/expenses" element={<ExpensesPage/>}/>}
              {user && <Route path="/" element={<HomePage/>}/>}
              {/* if user is not exist than redirect to login page */}
              {!user && <Route path="*" element={<Login/>}/>}
              
              
              
            </Routes>
          </div>
        </Router>
  }
}

export default App;
