import classNames from "classnames";
import React from "react";

const Input = ({ register = {}, className, ...props }) => {
  return (
    <input
      {...register}
      {...props}
      className={classNames(
        "h-11 w-full rounded border border-solid border-gray-600 p-4 text-xs placeholder:text-gray-400",
        { [className]: className },
      )}
    />
  );
};

export default Input;
