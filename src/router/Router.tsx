import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "components/Dashboard";
import AuthPage from "views/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>
        <Route path="/auth/*" element={<AuthPage />} />
        <Route path="/*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    </>
  );
};

export default AppRouter;
