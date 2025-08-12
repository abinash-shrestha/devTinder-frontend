import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
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
  // const { firstName, lastName, gender, age, photoUrl, skills } = user;

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🧑‍🤝‍🧑DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-3">
          <p>
            {user.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1)}
          </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-primary-focus"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-base-300"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge badge-primary badge-sm">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-base-200">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-base-200">
                  Requests
                </Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="hover:bg-error hover:text-error-content"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
