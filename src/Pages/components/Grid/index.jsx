import classNames from "classnames";
import React from "react";

const Grid = ({ applications, title, onRowClick }) => {
  const applicationColums = Object.keys(applications[0]);

  return (
    <div className="flex max-h-[70%] w-5/6 flex-col gap-10 rounded-xl border bg-slate-100 p-10 md:w-4/5 lg:w-3/4">
      <div className="flex justify-center">
        <h2>{title}</h2>
      </div>
      <div className="overflow-auto shadow">
        <table className="table-auto border-collapse text-sm">
          <thead>
            <tr>
              {applicationColums.map((col) => {
                return (
                  <th
                    key={col}
                    className="border-b p-4 py-3 pr-8 text-left font-medium uppercase"
                  >
                    {col}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              return (
                <tr
                  className={classNames("hover:bg-slate-50", {
                    "cursor-pointer": onRowClick,
                  })}
                  onClick={(e) => {
                    if (
                      window.getSelection().toString().length === 0 &&
                      e.target.tagName.toLowerCase() !== "img"
                    ) {
                      onRowClick && onRowClick(application);
                    }
                  }}
                  key={application.id}
                >
                  {Object.entries(application).map(
                    ([key, applicationValue], index) => {
                      return (
                        <td
                          key={index}
                          className="text-nowrap border-b p-4 pr-8 text-gray-600"
                        >
                          {key === "photo" ? (
                            <a
                              href={applicationValue}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img src={applicationValue} alt={key} />
                            </a>
                          ) : (
                            <p>{applicationValue}</p>
                          )}
                        </td>
                      );
                    },
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid;
