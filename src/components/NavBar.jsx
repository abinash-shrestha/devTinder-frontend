import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  // const { firstName, lastName, gender, age, photoUrl, skills } = user;
  console.log(user);
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">🧑‍🤝‍🧑DevTinder</a>
      </div>
      {user && (
        <div className="flex items-center">
          <p>
            Welcome,{' '}
            {user.firstName.charAt(0).toUpperCase() +
              String(user.firstName).slice(1)}
          </p>
          <div className="dropdown dropdown-end mx-5 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
