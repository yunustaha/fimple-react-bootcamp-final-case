import React from "react";
import classNames from "classnames";
import Button from "../Button";

const StatusCard = ({
  title,
  description,
  buttonLabel,
  icon: Icon,
  handleButtonClick,
  color,
}) => {
  return (
    <div className="relative flex flex-col items-center gap-5 rounded bg-slate-100 p-10 shadow">
      <div
        className={classNames("absolute -top-11", {
          "text-lime-500": color === "green",
          "text-orange-500": color === "orange",
          "text-red-500": color === "red",
        })}
      >
        <Icon size={72} />
      </div>
      <div className="text-xl text-gray-600">
        <p>{title}</p>
      </div>
      <p className="text-gray-600">{description}</p>
      <Button
        onClick={handleButtonClick}
        className={classNames({
          "bg-lime-500": color === "green",
          "bg-orange-500": color === "orange",
          "bg-red-500": color === "red",
        })}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

export default StatusCard;
