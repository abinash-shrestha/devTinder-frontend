import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState('abinash@gmail.com');
  const [password, setPassword] = useState('Abinash@123');
  const [error, setError] = useState('');
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
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full max-w-md border p-8 shadow-xl">
        <h2 className="text-center text-2xl font-bold text-primary mb-6">
          Welcome Back
        </h2>

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

        <button className="btn btn-primary w-full mt-6" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
