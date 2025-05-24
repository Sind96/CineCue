import TitleAndLogo from "../components/_universal/Title";

const HomePage = () => {
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

export default HomePage;
