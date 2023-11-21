import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="bg-orange-600 px-4 py-1 text-white rounded-md"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
