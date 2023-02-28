import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SigUp from './pages/SignUp/SigUp';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/HomePage';
import IncomePage from './pages/IncomesPage/IncomePage';
function App() {
  
  
 return <Router>
          <div className="app ">
            <Routes>
              
                  
              <Route path="/signup" element={<SigUp/>}/>
              <Route path="/login" element={<Login/>}/> 
              <Route path="/incomes" element={<IncomePage/>}/>
              <Route path="/" element={<HomePage/>}/> 
              
            </Routes>
          </div>
        </Router>
}

export default App;
