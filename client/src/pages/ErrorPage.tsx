import { Link } from "react-router-dom";
import Navbar from "../components/NavBar/_Navbar";

const ErrorPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Movie Not Found 😞
          </h1>
          <p className="text-lg text-muted-foreground">
            Sorry, we couldn't find what you were looking for. <br />
            It may have been removed or doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-md hover:bg-primary/90 transition-colors"
          >
            Go back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
