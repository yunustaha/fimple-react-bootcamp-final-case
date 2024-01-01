import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import ErrorMessage from "../components/Form/ErrorMessage";
import FormItem from "../components/Form/FormItem";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Input from "../components/Input";
import { useYupValidationResolver } from "../../utils";

const validationSchema = yup.object({
  userName: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const resolver = useYupValidationResolver(validationSchema);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("/admin/login", data);

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;

      navigate("/admin/basvuru-listesi");
    } catch (error) {
      toast.error(
        error && error.response && error.response.status === 403
          ? "The username or password is incorrect!"
          : "Something Went Wrong!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {token ? (
        <Navigate to="/admin/basvuru-listesi" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[90%] flex-col items-center justify-center gap-10 rounded-lg bg-slate-100 p-10 shadow sm:max-w-[60%] md:max-w-[40%]">
            <div>
              <h2>Admin Panel</h2>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              <FormItem title={"User Name"}>
                <Input register={{ ...register("userName") }} />
                <ErrorMessage visibility={errors.userName} />
              </FormItem>
              <FormItem title={"Password"}>
                <Input register={{ ...register("password") }} type="password" />
                <ErrorMessage visibility={errors.password} />
              </FormItem>
              <Button loading={loading} type="submit">
                Login
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
