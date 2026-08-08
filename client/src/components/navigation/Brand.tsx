import { Link } from "react-router-dom";

const Title = () => {
  return (
    <div className="text-white font-bold text-8xl lg:text-4xl tracking-wide">
      <Link to="/" className="hover:text-primary transition-colors">
        Cine<span className="text-primary">Cue</span>
      </Link>
    </div>
  );
};

export default Title;
