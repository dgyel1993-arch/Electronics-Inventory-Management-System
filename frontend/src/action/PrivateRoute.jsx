import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth && auth.token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
