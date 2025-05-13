import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('pratik@gmail.com');
  const [password, setPassword] = useState('Pratik@12');

  const handleLogin = async () => {
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
      setError(error?.response?.data || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button
          className="btn btn-neutral mt-4"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
