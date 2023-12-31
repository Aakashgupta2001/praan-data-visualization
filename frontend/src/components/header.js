import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/authSlice";

function Header({ setDark, isAuthenticated }) {
  // toggling the dark mode state to toggle darkmode
  let toggleDarkMode = () => {
    setDark((prevState) => !prevState);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //clearing localstorage and redirecting user to login page after logout
  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white z-10 fixed w-full border-gray-200 dark:bg-gray-900">
      <div className="mx-10 flex items-center justify-between p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Praan Weather</span>
        </a>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={toggleDarkMode}
          >
            Toggle Dark Mode
          </button>
          {isAuthenticated && (
            <button
              type="button"
              className="text-white mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={logoutUser}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
