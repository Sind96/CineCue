import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WatchListPage from "./pages/WatchListPage";
import IndividualMoviePage from "./pages/IndividualMoviePage";
import SignUpPage from "./pages/loginPages/SignUpPage";
import Navbar from "./components/NavBar/_Navbar";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/loginPages/SignInPage";
import { AuthProvider } from "./hooks/AuthContext";
import ProtectedRoute from "./pages/loginPages/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <WatchListPage />
                </ProtectedRoute>
              }
            />
            <Route path="/movie/:imdbID" element={<IndividualMoviePage />} />
            <Route path="/test" element={<Navbar />} />
          </Routes>
          <ToastContainer position="top-center" autoClose={3000} />
        </>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
