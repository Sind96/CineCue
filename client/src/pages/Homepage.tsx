import Title from "../components/Title.js";

const Homepage = () => {
  const title = (
    <p>
      Cine<span>Cue</span>
    </p>
  );

  return (
    <div>
      <Title title={title} />
    </div>
  );
};

export default Homepage;
