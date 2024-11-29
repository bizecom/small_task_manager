import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth/login';

function AuthLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <header className="my-3 p-3 bg-gray-300 shadow rounded-md">
        <nav>
          <ul className="flex gap-5 items-center">
            {/* NavLink for Dashboard */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'text-blue-900' : 'text-black')}
              >
                Dashboard
              </NavLink>
            </li>

            {/* NavLink for Tasks */}
            <li>
              <NavLink
                to="/task"
                className={({ isActive }) => (isActive ? 'text-blue-900' : 'text-black')}
              >
                Tasks
              </NavLink>
            </li>

            {/* Logout Button */}
            <li className="ml-auto">
              <button
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
