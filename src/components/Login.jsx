import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [password, setPassword] = useState('');

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (userData && userData._id) {
      navigate('/');
    }
  }, [userData]);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + '/signup',
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUser(response?.data?.data));
      navigate('/profile');
    } catch (err) {
      setShowError(true);
      setError(err?.response?.data || 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        BASE_URL + '/login',
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response) {
        dispatch(setUser(response.data));
      }
      navigate('/');
    } catch (error) {
      setShowError(true);
      setError(error?.response?.data || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">
          {isLoginForm ? 'Login' : 'Sign Up'}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              onClick={(e) => setShowError(false)}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
              onClick={(e) => setShowError(false)}
              onEnter
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onClick={(e) => setShowError(false)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onClick={(e) => setShowError(false)}
        />
        {showError && <p className="text-red-500 mt-2">{error}</p>}
        <p
          className="text-sm mt-2"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm ? (
            <>
              New to DevTinder ?
              <span className="text-blue-400 cursor-pointer">{' Signup'}</span>
            </>
          ) : (
            <>
              Existing User ?
              <span className="text-blue-400 cursor-pointer">{' Login'}</span>
            </>
          )}
        </p>
        <button
          className="btn btn-neutral mt-4 flex justify-center items-center"
          onClick={() => {
            isLoginForm ? handleLogin() : handleSignUp();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loader-circle animate-spin border-2 border-t-transparent border-neutral-content rounded-full w-5 h-5"></div>
          ) : isLoginForm ? (
            'Login'
          ) : (
            'Sign Up'
          )}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
