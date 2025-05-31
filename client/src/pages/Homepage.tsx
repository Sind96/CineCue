import TitleAndLogo from "../components/_universal/Title";
import SearchBar from "../components/HomePage/SearchBar";

const HomePage = () => {
  const title = (
    <p>
      Cine<span>Cue</span>
    </p>
  );

  return (
    <div>
      <TitleAndLogo title={title} />
      <SearchBar />
    </div>
  );
};

export default HomePage;
