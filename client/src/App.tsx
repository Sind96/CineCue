import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WatchListPage from "./pages/WatchListPage";
import IndividualMoviePage from "./pages/IndividualMoviePage";
import SignUpPage from "./pages/loginPages/SignUpPage";
import Navbar from "./components/_universal/Navbar";
import HomePage from "./pages/Homepage";
import SignInPage from "./pages/loginPages/SignInPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/page/:imdbID" element={<IndividualMoviePage />} />
        <Route path="/test" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
