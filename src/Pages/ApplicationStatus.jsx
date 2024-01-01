import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import StatusCard from "./components/StatusCard";

const ApplicationStatus = () => {
  const navigate = useNavigate();
  const params = useParams();

  const handleButtonClick = () => {
    navigate("/basvuru-sorgula");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <StatusCard
        title="Awasome!"
        description={`Your application has been successfully created. Id: ${
          params && params.insertId
        }`}
        buttonLabel="Continue"
        handleButtonClick={handleButtonClick}
        icon={FaCheckCircle}
        color="green"
      />
    </div>
  );
};

export default ApplicationStatus;
