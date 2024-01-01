import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./components/Form/ErrorMessage";
import Button from "./components/Button";
import Input from "./components/Input";

const SearchForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    navigate(`/basvuru/${data.search}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-5 md:flex-row"
    >
      <div className="relative flex grow-[2] flex-col">
        <label className="flex flex-col">
          <p>Application No</p>
          <Input
            register={{ ...register("search", { required: true }) }}
            type="text"
            placeholder="Search..."
          />
        </label>
        <div className="absolute -bottom-5">
          <ErrorMessage visibility={errors.search} />
        </div>
      </div>
      <div className="flex grow items-end">
        <Button>Check</Button>
      </div>
    </form>
  );
};

const CheckApplication = () => {
  return (
    <div className="box-border flex h-full items-center justify-center py-16 ">
      <div className="w-5/6 rounded bg-slate-100 p-10 shadow md:w-4/5 lg:w-2/4">
        <div className="mb-5 flex flex-col items-center gap-5">
          <h2>Check Application</h2>
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default CheckApplication;
