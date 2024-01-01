import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import FormItem from "./components/Form/FormItem";
import ErrorMessage from "./components/Form/ErrorMessage";
import Button from "./components/Button";
import Input from "./components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useYupValidationResolver } from "../utils";

const validationSchema = yup.object({
  name: yup.string().required("Required"),
  surname: yup.string().required("Required"),
  age: yup.number().required("Required"),
  identityNumber: yup.number().required("Required"),
  applicationReason: yup.string().required("Required"),
  address: yup.string().required("Required"),
  photo: yup.string().url().required("Please enter image URL"),
});

const CreateApplication = () => {
  const [loading, setLoading] = useState(false);
  const resolver = useYupValidationResolver(validationSchema);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/application", data);

      navigate(`/basvuru-basarili/${response.data.insertId}`);
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="flex min-w-[90%] max-w-[90%] flex-col items-center justify-center gap-10 rounded-lg bg-slate-100 p-10 shadow sm:min-w-[66%] sm:max-w-[66%]">
        <div>
          <h2>Application Request Form</h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5"
        >
          <div className="flex w-full flex-col gap-5 sm:flex-row">
            <FormItem title={"Name"}>
              <Input register={{ ...register("name") }} />
              <ErrorMessage visibility={errors.name} />
            </FormItem>
            <FormItem title={"Surname"}>
              <Input register={{ ...register("surname") }} />
              <ErrorMessage visibility={errors.surname} />
            </FormItem>
          </div>

          <div className="flex w-full flex-col gap-5 sm:flex-row">
            <FormItem title={"Age"}>
              <Input register={{ ...register("age") }} type="number" min={0} />
              <ErrorMessage visibility={errors.age} />
            </FormItem>
            <FormItem title={"Identity Number"}>
              <Input
                register={{ ...register("identityNumber") }}
                type="number"
                min={0}
              />
              <ErrorMessage visibility={errors.identityNumber} />
            </FormItem>
          </div>

          <div className="flex w-full flex-col gap-5 sm:flex-row">
            <FormItem title={"Application Reason"}>
              <Input register={{ ...register("applicationReason") }} />
              <ErrorMessage visibility={errors.applicationReason} />
            </FormItem>
            <FormItem title={"Address"}>
              <Input register={{ ...register("address") }} />
              <ErrorMessage visibility={errors.address} />
            </FormItem>
          </div>

          <FormItem title={"Photo Url"}>
            <Input type="url" register={{ ...register("photo") }} />
            <ErrorMessage
              visibility={errors.photo}
              message={errors.photo && errors.photo.message}
            />
          </FormItem>
          <Button loading={loading} type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateApplication;
