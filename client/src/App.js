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


  useEffect(() => {
    publicRequest().get("/start")
      .then((res) => {
        setServeIsRunning(true)
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
              <Route path="/incomes" element={<IncomePage/>}/>
              <Route path="/autoexpenses" element={<AutoExpensePage/>}/>
              <Route path="/expenses" element={<ExpensesPage/>}/>
              <Route path="/" element={<HomePage/>}/> 
              
            </Routes>
          </div>
        </Router>
  }
}

export default App;
