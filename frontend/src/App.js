import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Home />} />
            </Route>
            <Route path='/personal/details/:id' element={<PrivateRoute />}>
              <Route path='/personal/details/:id' element={<UserProfile />} />
            </Route>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
