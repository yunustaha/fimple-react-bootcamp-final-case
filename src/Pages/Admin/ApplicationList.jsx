import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { SlSocialDropbox } from "react-icons/sl";
import Grid from "../components/Grid";
import StatusCard from "../components/StatusCard";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [requestStatus, setRequestStatus] = useState("loading");
  const navigate = useNavigate();

  const getApplications = () => {
    if (requestStatus !== "loading") {
      setRequestStatus("loading");
    }

    axios
      .get("/admin/applications")
      .then((result) => {
        const resultData = result.data.applications;
        if (resultData.length > 0) {
          setRequestStatus("success");
          setApplications(resultData);
        } else {
          setRequestStatus("empty");
        }
      })
      .catch((error) => {
        console.log(error);
        setRequestStatus("error");
        toast.error("Something Went Wrong!");
      });
  };

  const onRowClick = (row) => {
    navigate(`/admin/basvuru/${row.id}`);
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {requestStatus === "loading" && <Spinner />}
      {requestStatus === "empty" && (
        <StatusCard
          title="Unfortunately!"
          description="There are currently no applications."
          buttonLabel="Refresh"
          handleButtonClick={getApplications}
          icon={SlSocialDropbox}
          color="orange"
        />
      )}
      {requestStatus === "error" && (
        <StatusCard
          title="Oops!"
          description="Something went wrong."
          buttonLabel="Refresh"
          handleButtonClick={getApplications}
          icon={IoMdCloseCircle}
          color="red"
        />
      )}
      {requestStatus === "success" && (
        <Grid
          title="Applications"
          applications={applications}
          onRowClick={onRowClick}
        />
      )}
    </div>
  );
};

export default ApplicationList;
