import { Link } from "react-router-dom";
import Navbar from "../components/NavBar/_Navbar";

const UpdatePage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="text-center space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            202 😞
          </h1>
          <p className="text-lg text-muted-foreground">
            This page is currently under construction. <br /> We're working hard
            to bring it to you soon 🚧
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

export default UpdatePage;
