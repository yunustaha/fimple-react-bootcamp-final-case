import classNames from "classnames";
import React from "react";
import Spinner from "../Spinner";

const Button = ({ children, className, loading, ...props }) => {
  return (
    <>
      {!loading && (
        <button
          className={classNames(
            "h-11 w-full text-nowrap rounded bg-button p-3 text-sm font-medium text-white hover:opacity-95",
            { [className]: className != null },
          )}
          {...props}
        >
          {children}
        </button>
      )}
      {loading && (
        <div className="flex h-11 w-full justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Button;
