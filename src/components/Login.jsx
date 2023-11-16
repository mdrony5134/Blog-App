import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login();
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center w-full justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">logo</span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-4">
            <Input
              label="Email:"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be validated",
                },
              })}
            />
            <Input
              label="Password:"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <button type="submit" className="w-full">
              Sing in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
