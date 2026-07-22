import { Navigate, Route, Routes } from "react-router-dom";
import AdminShell from "./layouts/AdminShell";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminShell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
