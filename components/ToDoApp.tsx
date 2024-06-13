"use client";
import Link from "next/link";
import React, { FormEvent,  useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";


type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
const ToDoApp = () => {
  const [search, setSearch] = useState("");
const [option, setoption] = useState<keyof FormData>("firstName");
  // ======= STATES FOR PASSWORD AND CONFIRMPASSWORD SHOW OR HIDDEN ==============
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState(false);
  // =========== STATE FOR UPDATED FORMDATA  ===============
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // ========== USEFORM HOOK FOR FORM SUBMITION AND VALIDATION =================
  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  // ========= STATE FOR SHOW FORMDATA LIST =================
  const [show, setShow] = useState<FormData[]>([]);
  // ======== UPDATE FORMDATA ARRAY AFTER EDIT FORMDATA ================
  const updateFormData = (index: number, data: FormData) => {
    const updatedShow = [...show];
    updatedShow[index] = data;
    setShow(updatedShow);
    setEditIndex(null);
    reset();
  };
  // =========== DELETE SELECTED FORMDATA ====================
  const deleteFormData = (index: number) => {
    const updatedShow = show.filter((_, i) => i !== index);
    setShow(updatedShow);
    reset();
  };
  // ================ FORM DATA SUBMIT FUNCTION ==============
  const formSubmit = (data: FormData) => {
    // ========== UPDATED FORMDATA SUBMIT CONDITION ===========
    if (editIndex !== null) {
      const existingEmails = show
        .filter((_, i) => i !== editIndex)
        .map((item) => item.email);
      if (existingEmails.includes(data.email)) {
        Swal.fire({
          title: "Email Exits",
          text: "Try With Another Email",
          icon: "error",
          confirmButtonText: "Try Again!",
        });
      } else {
        updateFormData(editIndex, data);
      }
    } else {
      // ========= CHECK FOR EXITS EMAIL ==============
      const checkEmail = show.some((item) => item.email === data.email);
      if (checkEmail) {
        Swal.fire({
          title: "Email Exits",
          text: "Try With Another Email",
          icon: "error",
          confirmButtonText: "Try Again!",
        });
      } else {
        setShow([...show, data]);
        Swal.fire({
          title: "Data Saved",
          text: "Thank you For Submittion.",
          icon: "success",
          confirmButtonText: "Done",
        });
        reset();
      }
    }
  };
  // ============ EDIT SELECTED FORMDATA FUNCTION ===============
  const editFormData = (index: number) => {
    const item = show[index];
    setValue("firstName", item.firstName);
    setValue("lastName", item.lastName);
    setValue("email", item.email);
    setValue("password", item.password);
    setValue("confirmPassword", item.confirmPassword);
    setEditIndex(index);
  };
  const submitFilter = (e:FormEvent) => {
    e.preventDefault();
    const searchData = show.filter((item) =>{
      const value = item[option];
     return typeof value === 'string' &&  value.toLowerCase().match(search.toLowerCase())}
    );
    setShow(searchData);
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="container max-w-[1140px] mx-auto p-5">
        {/* ========== BACK BUTTON FOR GO TO HOMEPAGE ============ */}
        <Link
          href={"/"}
          className="mb-5 px-6 py-1 leading-[150%] text-xl font-bold font-mono text-black rounded-lg bg-white border border-transparent hover:border-white hover:text-black duration-300 hover:scale-[.95] inline-block"
        >
          Back
        </Link>
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase text-white font-mono font-bold text-center md:mb-5 mb-4">
          My To Do App
        </h1>
        <div className="max-w-[500px] overflow-hidden mx-auto border-2 border-solid border-white rounded-xl sm:p-7 p-4 bg-white bg-opacity-30">
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="flex flex-col sm:gap-6 gap-5">
              {/* =========== FIRST NAME INPUT ========= */}
              <div className="relative">
                <input
                  className={`w-full sm:px-4 sm:py-2 px-3 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-white hover:shadow-lg hover:shadow-green-100 ${
                    errors.firstName && "border-red-500"
                  }`}
                  {...register("firstName", { required: true })}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute">
                    First Name is required.
                  </p>
                )}
              </div>
              {/* ============ LAST NAME INPUT ============ */}
              <div className="relative">
                <input
                  className={`w-full sm:px-4 sm:py-2 px-3 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-white hover:shadow-lg hover:shadow-green-100 ${
                    errors.lastName && "border-red-500"
                  }`}
                  {...register("lastName", { required: true, minLength: 2 })}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute">
                    Last Name is required.
                  </p>
                )}
              </div>
              {/* ============= EMAIL INPUT ================= */}
              <div className="relative">
                <input
                  className={`w-full sm:px-4 sm:py-2 px-3 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-white hover:shadow-lg hover:shadow-green-100 ${
                    errors.email && "border-red-500"
                  }`}
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
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute">
                    {errors.email.message
                      ? "Please Enter A Valid Email!"
                      : "Please enter your email"}
                  </p>
                )}
              </div>
              {/* ============= PASSWORD INPUT =============== */}
              <div className="relative">
                <input
                  className={`w-full ps-3 pe-9 sm:ps-4 sm:py-2 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-white hover:shadow-lg hover:shadow-green-100 ${
                    errors.password && "border-red-500"
                  } ${
                    showPassword
                      ? "!border-red-500 shadow-red-500 hover:border-red-500 hover:shadow-red-100"
                      : ""
                  }`}
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
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute">
                    {errors.password.message
                      ? "Use 8-16 letters, at least 1 uppercase, 1 number, and one symbol"
                      : "Please Enter Your Password"}
                  </p>
                )}
                <span
                  className="absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
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
                  className={`w-full ps-3 pe-9 sm:ps-4 sm:py-2 py-1 border-2 rounded-lg outline-none hover:border-green-500 duration-300 border-solid border-white hover:shadow-lg hover:shadow-green-100 ${
                    errors.confirmPassword && "border-red-500"
                  } ${
                    confirmPassword
                      ? "!border-red-500 shadow-red-500 hover:border-red-500 hover:shadow-red-100"
                      : ""
                  }`}
                  type={confirmPassword ? "text" : "password"}
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
                  <p className="text-red-700 font-medium text-[9px] sm:text-sm absolute">
                    Passwords should match!
                  </p>
                )}
                <span
                  className="absolute top-[50%] right-2 translate-y-[-50%] cursor-pointer"
                  onClick={() => setconfirmPassword(!confirmPassword)}
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
                className="px-6 w-full py-2 leading-[150%] text-xl font-bold font-mono text-black rounded-xl bg-white border-2 border-transparent hover:border-white hover:scale-[.95] duration-300 hover:bg-white cursor-pointer"
                type="submit"
                value={editIndex !== null ? "Update" : "Submit"}
              />
            </div>
          </form>
        </div>
        {/* =========== FORM DATA TABLE ========== */}
        {show.length > 0 ? (
          <div className="block overflow-hidden overflow-x-auto max-w-[700px] mx-auto p-5 mt-5 rounded-xl bg-black bg-opacity-30">
             <form onSubmit={submitFilter} className="flex justify-center">
          {/* ============= Select =========== */}
          <select aria-label="user-data"
            className="py-2 px-3 rounded-xl outline-none"
            onChange={(e) => setoption(e.target.value as keyof FormData)}
          >
            <option value="firstName">First Name</option>
            <option value="lastName">last Name</option>
            <option value="email">email</option>
          </select>
          {/* ======= SEARCH INPUT ========== */}
          <input
            className="border-2 mx-4 border-solid border-transparent hover:border-green-500 hover:shadow-lg hover:shadow-green-100 duration-300 sm:px-4 sm:py-2 px-3 py-1 outline-none rounded-xl"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Data"
          />
          {/* ========= SEARCH BUTTON ========== */}
          <button className="px-6 py-1 leading-[150%] text-xl font-bold font-mono text-black rounded-lg bg-white border border-transparent hover:border-white hover:text-black duration-300 hover:scale-[.95] inline-block">
            Search
          </button>
        </form>
            <table className="w-full border-2 border-white max-w-[500px] mx-auto mt-5">
              <thead>
                <tr>
                  <th className="text-white text-xl font-mono font-medium text-nowrap">
                   First Name
                  </th>
                  <th className="text-white text-xl font-mono font-medium text-nowrap">
                   Last Name
                  </th>
                  <th className="text-white text-xl font-mono font-medium">
                    Email
                  </th>
                  <th className="text-white text-xl font-mono font-medium">
                    Action
                  </th>
                  <th className="text-white text-xl font-mono font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {show.map((obj, i) => {
                  return (
                    <tr key={i} className="border-2 border-white">
                      <td className="text-white text-xl font-mono font-normal px-3 text-nowrap">
                        {obj.firstName} 
                      </td>
                      <td className="text-white text-xl font-mono font-normal px-3 text-nowrap">
                       {obj.lastName}
                      </td>
                      <td className="text-white text-xl font-mono font-normal px-3">
                        {obj.email}
                      </td>
                      <td>
                        <button
                          onClick={() => editFormData(i)}
                          className="text-xl font-moo font-normal px-5 py-1 rounded-lg bg-green-600 hover:bg-transparent hover:border-green-600 hover:text-green-600 border-2 border-transparent duration-300 font-sans text-center text-white cursor-pointer"
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteFormData(i)}
                          className="text-xl font-mono font-normal px-5 py-1 rounded-lg bg-red-600 hover:bg-transparent border-2 border-transparent hover:border-red-600 duration-300 hover:text-red-600 text-center text-white cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xl text-white font-semibold text-center mt-5">
            No List found!
          </p>
        )}
        
      </div>
    </div>
  );
};

export default ToDoApp;
