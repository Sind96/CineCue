import Navbar from "../components/navigation/Navbar";
import MovieList from "../features/movies/components/MovieList";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <MovieList />
    </div>
  );
};

export default HomePage;
