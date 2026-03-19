import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { useAuth } from "./hooks/useAuth";
import Signup from "./pages/Signup";

function ProtectedRoute({ children }: any) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/notes"
          element={
            // <ProtectedRoute>
            <Notes />
            // </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={token ? "/notes" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
