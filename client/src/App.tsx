import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WatchListPage from "./pages/WatchListPage";
import IndividualMoviePage from "./pages/IndividualMoviePage";
import SignUpPage from "./pages/loginPages/SignUpPage";
import Navbar from "./components/NavBar/_Navbar";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/loginPages/SignInPage";
import ProtectedRoute from "./pages/loginPages/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import ComingSoonPage from "./pages/ComingSoonPage";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import GenrePage from "./pages/GenrePage";
import CollectionsPage from "./features/collections/pages/CollectionsPage";
import CollectionPage from "./features/collections/pages/CollectionPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/error" element={<NotFoundPage />} />
            <Route path="/update" element={<ComingSoonPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/genre/:genreId" element={<GenrePage />} />
            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <WatchListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/collections"
              element={
                <ProtectedRoute>
                  <CollectionsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/collections/:collectionId"
              element={
                <ProtectedRoute>
                  <CollectionPage />
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
