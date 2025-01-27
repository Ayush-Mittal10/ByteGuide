import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import avatar from '../assets/avatar.png';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await fetch('https://byteguide-backend.onrender.com/authentication/logout', {
        method: 'POST',
        credentials: 'include',
      });
      logout();
      toggleDropdown();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="w-full py-4 px-8 bg-transparent text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Byteguide Logo" className="h-20 w-20 mr-3 rounded-full border-4 border-white" />
          <div className="text-4xl font-bold">ByteGuide</div>
        </div>
        <div className="flex-grow flex justify-center">
          <a href="#about" className="mx-4 hover:underline">About</a>
          <a href="#features" className="mx-4 hover:underline">Features</a>
          <a href="#howitworks" className="mx-4 hover:underline">How It Works</a>
          <a href="#contact" className="mx-4 hover:underline">Contact</a>
          <a href="/profile" className="mx-4 hover:underline">Profile</a>
        </div>
        <div>
          {isAuthenticated ? (
            <div className="relative">
              <img src={avatar} alt="Profile Avatar" className="h-10 w-10 rounded-full cursor-pointer" onClick={toggleDropdown} />
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-20">
                  <a href="/profile" className="block px-4 py-2 hover:bg-gray-200">My Profile</a>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="mx-2 px-4 py-2 border border-white rounded hover:bg-white hover:text-black">
                <a href='/login'>Login</a>
              </button>
              <button className="mx-2 px-4 py-2 border border-white rounded hover:bg-white hover:text-black">
                <a href='/signup'>Signup</a>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
