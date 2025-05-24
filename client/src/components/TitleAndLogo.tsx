import { FaToggleOff } from "react-icons/fa6";
import type { TitleAndLogoProps } from "../@types/movies.components.type";

const TitleAndLogo = ({ title }: TitleAndLogoProps) => {
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
