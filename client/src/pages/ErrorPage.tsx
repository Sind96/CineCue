import { Link } from "react-router-dom";
import Navbar from "../components/NavBar/_Navbar";

const ErrorPage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <h1>Movie Not Found</h1>
        <p>Sorry, we couldn't find what you were looking for.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
