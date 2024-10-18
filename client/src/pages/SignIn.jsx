import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { signInStart,signInFailure,signInSuccess } from '../Redux/userslice';
const signin = () => {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user); // Correctly destructuring state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) { // Check if data contains 'success'
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.message)); // Use err.message instead of error.message
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 font-semibold'>SignIn</h1>
      {error && <p className='text-red-500'>{error}</p>} {/* Display error */}
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password' // Changed input type for password
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 uppercase border rounded-lg hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Signin'}
        </button>
        <button className='bg-red-700 text-white p-3 uppercase border rounded-lg hover:opacity-95'>
          Continue with Google
        </button>
      </form>
      <div className='flex mt-5 gap-2'>
        <p>If you dont have an have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-600'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
};

export default signin
