import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  // Import Navigate for redirection
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import MainDash from './components/MainDash/MainDash';
import RightDash from './components/RightDash/RightDash';
import UsersDash from './components/UsersDash/UsersDash';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          {/* Redirect the root ("/") path to the "/register" page */}
          <Route path="/" element={<Navigate to="/register" />} />
          
          {/* No Sidebar for login and register routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Sidebar will be shown for all other routes */}
          <Route path="*" element={
            <>
              <Sidebar />
              <div className="AppGlass">
                <Routes>
                  <Route path="/dashboard" element={<MainDash />} />
                  <Route path="/users" element={<UsersDash />} />
                  <Route path="/user-theme" element={<RightDash />} />
                </Routes>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
