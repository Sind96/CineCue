import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import WatchListPage from "./pages/WatchListPage";
import IndividualMoviePage from "./pages/IndividualMoviePage";
import SignUpPage from "./pages/loginPages/SignUpPage";
import Navbar from "./components/_universal/NavBar/Navbar";
import HomePage from "./pages/Homepage";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/page/:imdbID" element={<IndividualMoviePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
