import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Corrected typo

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Corrected initial state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) { // Check if data contains 'success'
        setError(data.message);
        setLoading(false);
        return;
      }

      navigate('/sign-in');
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7 font-semibold'>SignUp</h1>
      {error && <p className='text-red-500'>{error}</p>} {/* Display error */}
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
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
          {loading ? 'Loading...' : 'Signup'}
        </button>
        
      </form>
      <div className='flex mt-5 gap-2'>
        <p>Already have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-600'>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
