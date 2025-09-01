import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, CheckSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <CheckSquare size={24} />
            <span>TaskManager</span>
          </Link>
          
          <div className="navbar-menu">
            {user ? (
              <div className="navbar-user">
                <span className="user-name">Welcome, {user.name}</span>
                <button onClick={logout} className="btn btn-secondary">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-secondary">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;