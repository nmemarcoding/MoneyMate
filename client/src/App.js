import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SigUp from './pages/SignUp/SigUp';
import Login from './pages/Login/Login';
function App() {
  
  
 return <Router>
          <div className="app ">
            <Routes>
              
                  
              <Route path="/signup" element={<SigUp/>}/>
        
              <Route path="/login" element={<Login/>}/> 
              
            </Routes>
          </div>
        </Router>
}

export default App;
