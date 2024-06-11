"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const ToDoApp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [show, setShow] = useState<FormData[]>([]);

  const updateFormData = (index: number) => {
    const data = getValues();
    const updatedShow = [...show];
    updatedShow[index] = data;
    const checkEmail = show.some((item) => item.email === data.email);
      if (checkEmail) {
        alert("Email already exists");
        } else{
          setShow(updatedShow);
          setEditIndex(null);
          reset();
        }
  };

  const deleteFormData = (index: number) => {
    const updatedShow = show.filter((_, i) => i !== index);
    setShow(updatedShow);
    reset();
  };

  const formSubmit = (data: FormData) => {
    if (editIndex !== null) {
      updateFormData(editIndex);
      const checkEmail = show.some((item) => item.email === data.email);
      if (checkEmail) {
        alert("Email already exists");
        } else{
          reset();
        }
    } else {
      const checkEmail = show.some((item) => item.email === data.email);
      if (checkEmail) {
        alert("Email already exists");
      } else {
        setShow([...show, data]);
      reset();
      }
    }
  };

  const editFormData = (index: number) => {
    const item = show[index];
    setValue('firstName',item.firstName)
    setValue('lastName',item.lastName)
    setValue('email',item.email)
    setValue('password',item.password)
    setValue('confirmPassword',item.confirmPassword)
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="container max-w-[1140px] mx-auto p-5">
        <Link href={"/"}>
          <button className="mb-5 px-6 py-1 leading-[150%] text-xl font-bold font-mono text-white rounded-lg bg-black border border-transparent hover:border-black hover:text-black duration-300 hover:bg-white">
            Back
          </button>
        </Link>
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase text-black font-mono font-bold text-center md:mb-10 mb-4">
          My To Do App
        </h1>
        <div className="max-w-[500px] overflow-hidden mx-auto border-2 border-solid border-black rounded-xl sm:p-7 p-4">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col sm:gap-6 gap-5">
              {/* =========== FIRST NAME INPUT ========= */}
              <div className="relative">
                <input
                  className={`w-full sm:px-4 sm:py-2 px-3 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black hover:shadow-lg hover:shadow-green-100 ${errors.firstName && "border-red-500"}`}
                  {...register("firstName", { required: true })}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">
                    First Name is required.
                  </p>
                )}
              </div>
              {/* ============ LAST NAME INPUT ============ */}
              <div className="relative">
                <input
                  className={`w-full sm:px-4 sm:py-2 px-3 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black hover:shadow-lg hover:shadow-green-100 ${errors.lastName && "border-red-500"}`}
                  {...register("lastName", { required: true, minLength: 2 })}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">
                    Last Name is required.
                  </p>
                )}
              </div>
              {/* ============= EMAIL INPUT ================= */}
              <div className="relative">
                <input
                  className={`w-full sm:px-4 sm:py-2 px-3 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black hover:shadow-lg hover:shadow-green-100 ${errors.email && "border-red-500"}`}
                  type="text"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please Enter A Valid Email!",
                    },
                  })}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">
                    {errors.email.message
                      ? "Please Enter A Valid Email!"
                      : "Please enter your email"}
                  </p>
                )}
              </div>
              {/* ============= PASSWORD INPUT =============== */}
              <div className="relative">
                <input
                  className={`w-full ps-3 pe-9 sm:ps-4 sm:py-2 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black hover:shadow-lg hover:shadow-green-100 ${errors.password && "border-red-500"}`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Please Enter Your Password",
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                      message: "Password must be strong",
                    },
                  })}
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">
                    {errors.password.message
                      ? "Use 8 letters, at least 1 uppercase, 1 number, and one symbol"
                      : "Please Enter Your Password"}
                  </p>
                )}
                <span
                  className="absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-red-500" />
                  ) : (
                    <FaEye className="text-green-500" />
                  )}
                </span>
              </div>
              {/* ============= CONFIRM PASSWORD INPUT =========== */}
              <div className="relative">
                <input
                  className={`w-full ps-3 pe-9 sm:ps-4 sm:py-2 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black hover:shadow-lg hover:shadow-green-100 ${errors.confirmPassword && "border-red-500"}`}
                  type={confirmPassword ? "text":"password"}
                  id="password"
                  {...register("confirmPassword", {
                    validate: (match) => {
                      const password = getValues("password");
                      return match === password || "Passwords should match!";
                    },
                    required: "Please enter your confirm password",
                  })}
                  placeholder="Enter Your Confirm Password"
                />
                {errors.confirmPassword?.message && (
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">
                    Passwords should match!
                  </p>
                )}
                 <span
                  className="absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
                  onClick={()=>setconfirmPassword(!confirmPassword)}
                >
                  {confirmPassword ? (
                    <FaEyeSlash className="text-red-500" />
                  ) : (
                    <FaEye className="text-green-500" />
                  )}
                </span>
              </div>
              {/* =========== SUBMIT BUTTON INPUT =================== */}
              <input
                className="px-6 w-full py-2 leading-[150%] text-xl font-bold font-mono text-white rounded-xl bg-black border border-transparent hover:border-black hover:text-black duration-300 hover:bg-white"
                type="submit"
                value={editIndex !== null ? "Update" : "Submit"}
              />
            </div>

          </form>
        </div>
            {show.length > 0 ? (
              <div className="block overflow-hidden overflow-x-auto max-w-[700px] mx-auto mt-5">
                <table className="w-full mt-5 border-2 border-black max-w-[500px] mx-auto">
                  <thead>
                    <tr>
                      <th className="text-black text-xl font-mono font-medium">
                        Name
                      </th>
                      <th className="text-black text-xl font-mono font-medium">
                        Email
                      </th>
                      <th className="text-black text-xl font-mono font-medium">
                        Action
                      </th>
                      <th className="text-black text-xl font-mono font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {show.map((obj, i) => {
                      return (
                        <tr key={i} className="border-2 border-black">
                          <td className="text-black text-xl font-mono font-normal px-3 text-nowrap">
                            {obj.firstName} {obj.lastName}
                          </td>
                          <td className="text-black text-xl font-mono font-normal px-3">
                            {obj.email}
                          </td>
                          <td
                            
                          >
                            <button onClick={() => editFormData(i)}
                            className="text-xl font-mono font-normal px-5 py-1 rounded-lg bg-green-600 text-center text-white cursor-pointer">
                            Edit
                            </button>
                          </td>
                          <td>
                            <button  onClick={() => deleteFormData(i)}
                            className="text-xl font-mono font-normal px-5 py-1 rounded-lg bg-red-600 text-center text-white cursor-pointer">
                            Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ):(<p className="text-xl text-black font-semibold text-center mt-5">No List found!</p>)            }
      </div>
    </div>
  );
};

export default ToDoApp;