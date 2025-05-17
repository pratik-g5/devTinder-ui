import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import axios from 'axios';

const body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const userData = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispatch(setUser(userData.data));
    } catch (err) {
      if (err.status === 401 || err.status === 400) {
        navigate('/login');
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (window.location.pathname !== '/login') {
      fetchUser();
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mb-3 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default body;
