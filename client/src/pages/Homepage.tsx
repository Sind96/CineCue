import TitleAndLogo from "../components/TitleAndLogo";

const Homepage = () => {
  const title = (
    <p>
      Cine<span>Cue</span>
    </p>
  );

  return (
    <div>
      <TitleAndLogo title={title} />
    </div>
  );
};

export default Homepage;
