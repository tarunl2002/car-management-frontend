import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import CarEdit from './pages/CarEdit';
import AddCar from './components/AddCar';
import './index.css'
import './App.css'
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/cars/add" element={<AddCar/>} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/cars/:id/edit" element={<CarEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
