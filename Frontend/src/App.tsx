import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import ParkingSpots from "./Pages/ParkingSpots";
import Vehicles from "./Pages/Vehicles";
import Bookings from "./Pages/Bookings";
import ProtectedRoute from "./Context/Auth/ProtectedRoute";
import PersistLogin from "./Context/Auth/PersistLogin";
import Navbar from "./Components/Common/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parking-spots"
              element={
                <ProtectedRoute>
                  <ParkingSpots />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vehicles"
              element={
                <ProtectedRoute>
                  <Vehicles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
