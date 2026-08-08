import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WatchlistPage from "./features/watchlist/pages/WatchlistPage";
import IndividualMoviePage from "./features/movies/pages/IndividualMoviePage";
import SignUpPage from "./features/auth/pages/SignUpPage";
import Navbar from "./components/navigation/Navbar";
import HomePage from "./pages/Homepage";
import SignInPage from "./features/auth/pages/SignInPage";
import RequireAuth from "./features/auth/components/RequireAuth";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import ComingSoonPage from "./pages/ComingSoonPage";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import GenrePage from "./features/movies/pages/GenrePage";
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
                <RequireAuth>
                  <WatchlistPage />
                </RequireAuth>
              }
            />
            <Route
              path="/collections"
              element={
                <RequireAuth>
                  <CollectionsPage />
                </RequireAuth>
              }
            />
            <Route
              path="/collections/:collectionId"
              element={
                <RequireAuth>
                  <CollectionPage />
                </RequireAuth>
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
