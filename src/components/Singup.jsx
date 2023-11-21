import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Input, Button } from "./index";
import singupImage from '../assets/sign-in.png'

const Singup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const create = async (data) => {
    console.log(data)
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
     <div>
       <div className="mt-16 py-6 px-4 bg-image text-orange-600">
      <h2 className="text-5xl text-center lg:text-7xl leading-snug font-bold">#SingUp Page</h2>
      </div>
    </div>

    <div className="flex items-center w-full justify-center my-8">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
           <img src={singupImage} alt="" className="inline-block w-full max-w-[100px]"/>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight my-4">
          Sign Up to your account
        </h2>
        
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-4">
            <Input
              label="FullName:"
              type="text"
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
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
            <Button type="submit" className="w-full bg-green-700 text-white py-2 rounded-lg text-xl font-bold">
             Sing Up
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Singup;
