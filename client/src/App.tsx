import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/HomePage";
// import SignInPage from "./pages/loginPages/SignInPage";
import WatchListPage from "./pages/WatchListPage";
import IndividualMoviePage from "./pages/IndividualMoviePage";
import SignUpPage from "./pages/loginPages/SignUpPage";
// import SearchBar from "./components/HomePage/SearchBar";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndividualMoviePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/page/:imdbID" element={<IndividualMoviePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
