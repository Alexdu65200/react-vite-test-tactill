import { CSSProperties } from "react";

interface Props {
  imageURL: string;
  title: string;
  titleEmoji?: string;
  description: string;
  badge?: string;
  descriptionMaxLength?: number;
  titleMaxLength?: number;
  className?: string;
  style?: CSSProperties | undefined;
  handleClick?: () => void;
  loading?: boolean;
}

const Card = ({
  imageURL,
  title,
  titleEmoji = "",
  description,
  descriptionMaxLength = 20,
  titleMaxLength = 23,
  badge = "",
  className,
  style,
  handleClick,
  loading,
}: Props) => {
  return (
    <div
      className={`border-2 border-grey-100 transform hover:-translate-y-1 duration-300 hover:shadow-xl hover:border-white cursor-pointer bg-white rounded-xl ${
        className ?? ""
      }`}
      onClick={() => (handleClick ? handleClick() : null)}
      style={style}
    >
      <div>
        <div className="p-3">
          <img
            className="w-full h-32 sm:h-48 object-cover shadow-lg rounded-xl"
            src={imageURL}
            alt=""
          />
        </div>
        <div className="m-4">
          <h1 className="text-2xl font-semibold text-gray-700">
            {`${titleEmoji}${titleEmoji ? " " : ""}${
              !title
                ? "N/A"
                : title.length > titleMaxLength
                ? title?.slice(0, titleMaxLength) + "..."
                : title
            }`}
          </h1>
          <div
            className="bg-gray-100 rounded-xl mt-4"
            style={{ height: "110px" }}
          >
            <p className="text font-light leading-relaxed text-gray-400 p-2">
              {description.length > descriptionMaxLength
                ? description.slice(0, descriptionMaxLength) + "..."
                : description}
            </p>
          </div>
        </div>
        <div className="bg-gray-700 text-white text-xs uppercase font-bold rounded-full p-2 absolute top-0 ml-2 mt-2">
          <span>{badge}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
