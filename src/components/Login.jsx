// import React, { useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addUser } from '../utils/userSlice';
// import { useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../utils/constants';

// const Login = () => {
//   const dispatch = useDispatch();
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [emailId, setEmailId] = useState('abinash@gmail.com');
//   const [password, setPassword] = useState('Abinash@123');
//   const [error, setError] = useState('');
//   const [isLoginForm, setIsLoginForm] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + '/login',
//         {
//           emailId,
//           password,
//         },
//         {
//           withCredentials: true,
//         }
//       );

//       // console.log(res.data);
//       dispatch(addUser(res.data.data));

//       navigate('/');
//     } catch (err) {
//       setError(err?.response?.data || 'Something went wrong');
//       console.error(err);
//     }
//   };

//   const handleSignup = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + '/signup',
//         { firstName, lastName, emailId, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.data));
//       navigate('/profile');
//     } catch (err) {
//       console.log(err.message);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-base-200 flex items-center justify-center py-12">
//       <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full max-w-md border p-8 shadow-xl">
//         <h2 className="text-center text-2xl font-bold text-primary mb-6">
//           {isLoginForm ? 'Welcome Back' : 'Sign up'}
//         </h2>

//         {!isLoginForm && (
//           <>
//             <label className="label">
//               <span className="label-text font-medium">First Name</span>
//             </label>
//             <input
//               type="text"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="input input-bordered w-full"
//               placeholder="First Name"
//             />

//             <label className="label">
//               <span className="label-text font-medium">Last Name</span>
//             </label>
//             <input
//               type="text"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="input input-bordered w-full"
//               placeholder="Last Name"
//             />
//           </>
//         )}

//         <label className="label">
//           <span className="label-text font-medium">Email</span>
//         </label>
//         <input
//           type="email"
//           value={emailId}
//           onChange={(e) => setEmailId(e.target.value)}
//           className="input input-bordered w-full"
//           placeholder="Email"
//         />

//         <label className="label">
//           <span className="label-text font-medium">Password</span>
//         </label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="input input-bordered w-full"
//           placeholder="Password"
//         />

//         {error && (
//           <div className="alert alert-error mt-4">
//             <span>{error}</span>
//           </div>
//         )}

//         <button
//           className="btn btn-primary w-full mt-6"
//           onClick={isLoginForm ? handleLogin : handleSignup}
//         >
//           {isLoginForm ? 'Login' : 'Sign up'}
//         </button>
//         <p
//           className="text-center text-[14px] cursor-pointer hover:scale-99 mt-2"
//           onClick={() => setIsLoginForm(!isLoginForm)}
//         >
//           {isLoginForm
//             ? 'Create an account'
//             : 'Already have an account? Log in here'}
//         </p>
//       </fieldset>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { Code2, Eye, EyeOff, Github, Linkedin } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('abinash@gmail.com');
  const [password, setPassword] = useState('Abinash@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Code2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            DevConnect
          </h1>
          <p className="text-gray-600">
            {isLoginForm ? 'Welcome back!' : 'Join the developer community'}
          </p>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-8">
          <div className="space-y-6">
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input-field"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={isLoginForm ? handleLogin : handleSignup}
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>
                    {isLoginForm ? 'Signing in...' : 'Creating account...'}
                  </span>
                </div>
              ) : (
                <span>{isLoginForm ? 'Sign In' : 'Create Account'}</span>
              )}
            </button>

            <div className="text-center">
              <button
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {isLoginForm
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              Or continue with
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </button>
              <button className="btn-secondary flex items-center justify-center space-x-2">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
