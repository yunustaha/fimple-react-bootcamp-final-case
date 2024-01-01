import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import StatusCard from "../components/StatusCard";
import { IoMdCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import { useYupValidationResolver } from "../../utils";
import * as yup from "yup";
import FormItem from "../components/Form/FormItem";
import Input from "../components/Input";
import ErrorMessage from "../components/Form/ErrorMessage";
import Button from "../components/Button";

const validationSchema = yup.object({
  answer: yup.string().required("Required"),
  status: yup.string().required("Required"),
});

const Form = ({ application, getApplication }) => {
  const resolver = useYupValidationResolver(validationSchema);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      answer: application.answer,
      status: application.status === "true",
    },
    resolver,
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.put(`/admin/application/${application.id}`, data);
      toast.success("Success!");
      getApplication();
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full max-w-[90%] flex-col items-center justify-center gap-10 rounded-lg bg-slate-100 p-10 shadow sm:max-w-[60%] md:max-w-[40%]">
      <div>
        <h2>Update Application</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormItem title={"Answer"}>
          <Input register={{ ...register("answer") }} />
          <ErrorMessage visibility={errors.answer} />
        </FormItem>
        <FormItem title={"Status"}>
          <Input
            register={{ ...register("status") }}
            type="checkbox"
            className="!size-11 p-0"
          />
          <ErrorMessage visibility={errors.status} />
        </FormItem>
        <Button loading={loading} type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

const Application = () => {
  const params = useParams();
  const [application, setApplication] = useState({});
  const [requestStatus, setRequestStatus] = useState("loading");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/admin/basvuru-listesi");
  };

  const getApplication = () => {
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
  };

  useEffect(() => {
    getApplication();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {requestStatus === "loading" && <Spinner />}
      {["error", "notFound"].includes(requestStatus) && (
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
        <Form application={application} getApplication={getApplication} />
      )}
    </div>
  );
};

export default Application;
