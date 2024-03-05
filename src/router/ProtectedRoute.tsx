import { useAuth } from "context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  console.log("currentUser P R O T E C T E D", currentUser);

  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};
