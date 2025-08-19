// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/constants';
// import axios from 'axios';
// import { removeUser } from '../utils/userSlice';

// const NavBar = () => {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
//       dispatch(removeUser());
//       navigate('/login');
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//   // const { firstName, lastName, gender, age, photoUrl, skills } = user;

//   return (
//     <div className="navbar bg-primary text-primary-content shadow-lg">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-xl">
//           🧑‍🤝‍🧑DevTinder
//         </Link>
//       </div>
//       {user && (
//         <div className="flex items-center gap-3">
//           <p>
//             {user.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1)}
//           </p>

//           <div className="dropdown dropdown-end">
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar hover:bg-primary-focus"
//             >
//               <div className="w-10 rounded-full">
//                 <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
//             >
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   {/* <span className="badge badge-primary badge-sm">New</span> */}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/changepassword" className="justify-between">
//                   Change Password
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/connections" className="hover:bg-base-200">
//                   Connections
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/requests" className="hover:bg-base-200">
//                   Requests
//                 </Link>
//               </li>
//               <li>
//                 <a
//                   onClick={handleLogout}
//                   className="hover:bg-error hover:text-error-content"
//                 >
//                   Logout
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavBar;

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import {
  Code2,
  User,
  Heart,
  Users,
  Settings,
  LogOut,
  Bell,
} from 'lucide-react';
import { useState } from 'react';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-200">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DevConnect
            </span>
          </Link>

          {user && (
            <>
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  to="/"
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                >
                  Discover
                </Link>
                <Link
                  to="/connections"
                  className={`nav-link ${
                    isActive('/connections') ? 'active' : ''
                  }`}
                >
                  Connections
                </Link>
                <Link
                  to="/requests"
                  className={`nav-link ${
                    isActive('/requests') ? 'active' : ''
                  }`}
                >
                  Requests
                </Link>
              </div>

              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    <img
                      src={
                        user.photoUrl ||
                        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400'
                      }
                      alt={user.firstName}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user.firstName}
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-lg py-2 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/changepassword"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
