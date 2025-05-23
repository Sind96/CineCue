import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Homepage from "./pages/Homepage";
import SignInPage from "./pages/loginPages/SignInPage";
import WatchListPage from "./pages/WatchListPage";
import IndividualMoviePage from "./pages/IndividualMoviePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/signup" element={<SignInPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/home/:imdbID" element={<IndividualMoviePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
