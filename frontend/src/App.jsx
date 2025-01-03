
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./Pages/Landing";
function App() {
 

  return (
    <>
       <Router>
        <Routes>
        
        <Route path="/login" element={<Auth />} />
        <Route path="/home" element={<ProtectedRoute>
          <Home/>
        </ProtectedRoute>} />
          
        <Route path="/" element={<Landing/>}>
            
          </Route>
        
        </Routes>
      </Router>
    </>
  )
}

export default App
