import Navbar from "../components/navigation/Navbar";
import MovieList from "../features/movies/components/MovieList";

const HomePage = () => {
  return (
    <div className="bg-secondary min-h-screen text-white">
      <Navbar />
      <MovieList />
    </div>
  );
};

export default HomePage;
