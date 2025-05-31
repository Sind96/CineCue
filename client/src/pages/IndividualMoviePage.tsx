import { MdOutlineStarOutline } from "react-icons/md";

const IndividualMoviePage = () => {
  return (
    <div>
      <img src="" />

      <div>
        <div>
          <div>
            <p>{}</p>
            <p>Genre: {}</p>
          </div>
          <p>
            <span>
              <MdOutlineStarOutline />
            </span>
            ({}/100)
          </p>
        </div>
        <p>{}</p>
        <p>Director: {}</p>
        <p>Stars: {}</p>
        <div>
          <div>
            <p>Watch Now On:</p>
            <a href="">
              <img src={""} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualMoviePage;
