import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('abinash@gmail.com');
  const [password, setPassword] = useState('Abinash@123');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // console.log(res.data);
      dispatch(addUser(res.data.data));

      navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
      console.error(err);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full max-w-md border p-8 shadow-xl">
        <h2 className="text-center text-2xl font-bold text-primary mb-6">
          {isLoginForm ? 'Welcome Back' : 'Sign up'}
        </h2>

        {!isLoginForm && (
          <>
            <label className="label">
              <span className="label-text font-medium">First Name</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="First Name"
            />

            <label className="label">
              <span className="label-text font-medium">Last Name</span>
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Last Name"
            />
          </>
        )}

        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Email"
        />

        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Password"
        />

        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}

        <button
          className="btn btn-primary w-full mt-6"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? 'Login' : 'Sign up'}
        </button>
        <p
          className="text-center text-[14px] cursor-pointer hover:scale-99 mt-2"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? 'Create an account'
            : 'Already have an account? Log in here'}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
