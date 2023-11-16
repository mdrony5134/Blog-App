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
    <div
      className="inline-block px-6 py-2 hover:bg-blue-100 rounded-full duration-200"
      onClick={logoutHandler}
    >
      Logout
    </div>
  );
};

export default LogoutBtn;
