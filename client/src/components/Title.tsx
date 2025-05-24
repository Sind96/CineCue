import { FaToggleOff } from "react-icons/fa6";
import type { TitleProps } from "../@types/movies.components.type";

const TitleAndLogo = ({ title }: TitleProps) => {
  return (
    <div>
      <div>
        <FaToggleOff />
        <div>{title}</div>
      </div>
    </div>
  );
};

export default TitleAndLogo;
