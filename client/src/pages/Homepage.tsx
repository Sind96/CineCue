import Navbar from "../components/NavBar/_Navbar";
import MovieList from "../components/HomePage/MovieList";

const HomePage = () => {
  return (
    <div className="bg-secondary min-h-screen text-white">
      <Navbar />
      <MovieList />
    </div>
  );
};

export default HomePage;
