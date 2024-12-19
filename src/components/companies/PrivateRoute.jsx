import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.account_type ==="company" ? <Outlet /> : <Navigate to="/company/login" replace />;
};
export default PrivateRoute;
