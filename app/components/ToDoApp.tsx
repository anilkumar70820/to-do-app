"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const ToDoApp = () => {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formSubmit = (data:object) => {
    console.log(data);
    reset()
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="container max-w-[1140px] mx-auto p-5">
        <Link href={"/"}><button className='mb-5 px-6 py-3 leading-[150%] text-xl font-bold font-mono text-white rounded-xl bg-black border border-transparent hover:border-black hover:text-black duration-300 hover:bg-white'>
       Back
    </button></Link>
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase text-black font-mono font-bold text-center mb-10">
          my to do app
        </h1>
        <div className="max-w-[500px] mx-auto border-2 border-solid border-black rounded-xl sm:p-10 p-4">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col sm:gap-8 gap-5">
                {/* =========== FIRST NAME INPUT ========= */}
              <div className="relative">
                <input
                  className="w-full px-4 py-2 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black"
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
                  className="w-full px-4 py-2 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black"
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
                  className="w-full px-4 py-2 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black"
                  type="email"
                  {...register("email", { required: true,
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                        message: "Please Enter A Valid Email!"
                    }
                   })}
                  placeholder="Email"
                />
                {errors.email && (
                    <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">{
                        errors.email.message ? "Please Enter A Valid Email!":"Please enter your email"
                    }</p>
                )
                }
              </div>
              {/* ============= PASSWORD INPUT =============== */}
              <div className="relative">
              <input
                  className="w-full px-4 py-2 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black"
                type="password" id="password"
                  {...register("password", { required: "Please Enter Your Password",
                    pattern: {
                        value:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                        message: "pasword must be strong"
                        },
                   })}
                  placeholder="Enter Your Password"
                />
                {errors.password && (
                    <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">{errors.password.message ? "pasword must be strong ":"Please Enter Your Password"}
                    </p>
                )}
              </div>
              {/* ============= CONFIRM PASSWORD INPUT =========== */}
              <div className="relative">
              <input
                  className="w-full px-4 py-2 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-black"
                type="password" id="password"
                  {...register("confirmPassword", { validate: (match) => {
                    const password = getValues("password")
                    return match === password || "Passwords should match!"
                },
                required:"please enter your confirm password"
                   })}
                  placeholder="Enter Your Confirm Password"
                />
                {errors.confirmPassword?.message && (
                    <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute left-0 sm:-bottom-5 -bottom-3">Password should match!</p>
                )}
              </div>
              {/* =========== SUBMIT BUTTON INPUT =================== */}
              <input
                className="px-6 w-full py-2 leading-[150%] text-xl font-bold font-mono text-white rounded-xl bg-black border border-transparent hover:border-black hover:text-black duration-300 hover:bg-white"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;
