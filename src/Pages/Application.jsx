import React, { useEffect, useState } from "react";
import { LuSearchX } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
import Grid from "./components/Grid";
import StatusCard from "./components/StatusCard";
import { IoMdCloseCircle } from "react-icons/io";

const Application = () => {
  const [application, setApplication] = useState({});
  const [requestStatus, setRequestStatus] = useState("loading");
  const params = useParams();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/basvuru-sorgula");
  };

  useEffect(() => {
    axios
      .get(`/application/${params.id}`)
      .then((result) => {
        if (result.data.application) {
          setRequestStatus("success");
          setApplication(result.data.application);
        } else {
          setRequestStatus("notFound");
        }
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus("error");
        toast.error("Something Went Wrong!");
      });
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {requestStatus === "loading" && <Spinner />}
      {requestStatus === "notFound" && (
        <StatusCard
          title="Unfortunately!"
          description="Your application could not be found."
          buttonLabel="Go Back"
          handleButtonClick={handleButtonClick}
          icon={LuSearchX}
          color="orange"
        />
      )}
      {"error" === requestStatus && (
        <StatusCard
          title="Oops!"
          description="Something went wrong."
          buttonLabel="Go Back"
          handleButtonClick={handleButtonClick}
          icon={IoMdCloseCircle}
          color="red"
        />
      )}
      {requestStatus === "success" && (
        <Grid title="Searched Application" applications={[application]} />
      )}
    </div>
  );
};

export default Application;
