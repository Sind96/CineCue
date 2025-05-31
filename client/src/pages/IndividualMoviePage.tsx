import { MdOutlineStarOutline } from "react-icons/md";
import AddToWatchList from "../components/IndividualMoviePage/AddToWatchList";

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
        <AddToWatchList />
      </div>
    </div>
  );
};

export default IndividualMoviePage;
