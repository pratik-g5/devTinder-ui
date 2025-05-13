import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 flex items-center">
        <img
          alt="Icon"
          src="../../public/devTinder.jpg"
          className="ml-4 w-12 h-12 rounded-md"
        />
        <Link
          to="/"
          className="btn btn-ghost text-xl"
        >
          DevTinder
        </Link>
      </div>
      {userData && (
        <>
          <p>Welcome, {userData.firstName} !</p>
          <div className="mx-5 dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
