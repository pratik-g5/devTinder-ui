import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../redux/userSlice';

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 flex items-center">
        <img
          alt="Icon"
          src="/devTinder.jpg"
          className="ml-4 w-10 h-10 sm:w-12 sm:h-12 rounded-md"
        />
        <Link
          to="/"
          className="btn btn-ghost text-lg sm:text-xl"
        >
          DevTinder
        </Link>
      </div>
      {userData && (
        <>
          <p className="hidden sm:block">Welcome, {userData.firstName} !</p>
          <div className="mx-2 sm:mx-5 dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-8 sm:w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={
                    userData.photoUrl
                      ? userData?.photoUrl
                      : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 sm:w-52 p-2 shadow"
            >
              <li>
                <Link
                  to="/profile"
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="justify-between"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="justify-between"
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/changePassword"
                  className="justify-between"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <a onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
