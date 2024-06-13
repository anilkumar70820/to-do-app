"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { tableData } from "./common/Helper";
type dataType = {
  firstName: String;
  lastName: String;
  email: String;
};
const FilterSearch = () => {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState<keyof dataType>("firstName");
  const [filterTable, setFilterTable] = useState<dataType[]>(tableData);
  const [firstRange, setFirstRange] = useState(0);
  const [secondRange, setSecondRange] = useState(50);
  const submitFilter = (e: FormEvent) => {
    e.preventDefault();
    const searchData = tableData.filter((item) => {
      const value = item[option];
      return (
        typeof value === "string" &&
          value.toLowerCase().match(search.toLowerCase())
      );
    });
    const sliceData = searchData.slice(firstRange, secondRange);
    if (firstRange > secondRange) {
          Swal.fire({
            title: "Invalid Range",
            text: "Try Other Range",
            icon: "error",
            confirmButtonText: "Change Range",
          });
        } else {
          setFilterTable(sliceData);
        }
    setFilterTable(sliceData);
  };
  // const rangeHandler = (e: FormEvent) => {
  //   e.preventDefault();
  //   const searchData = tableData.filter((item) => {
  //     const id = item.id;
  //     return id >= firstRange && id <= secondRange;
  //   });
  //   if (firstRange > secondRange) {
  //     Swal.fire({
  //       title: "Invalid Range",
  //       text: "Try Other Range",
  //       icon: "error",
  //       confirmButtonText: "Change Range",
  //     });
  //   } else {
  //     setFilterTable(searchData);
  //   }
  // };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center container max-w-[1140px] mx-auto py-5">
      <div className="container max-w-[1140px] mx-auto px-5">
        {/* ========== BACK BUTTON FOR GO TO HOMEPAGE ============ */}
        <Link
          href={"/"}
          className="mb-5 px-6 py-1 leading-[150%] text-xl font-bold font-mono text-black rounded-lg bg-white border border-transparent hover:border-white hover:text-black duration-300 hover:scale-[.95] inline-block"
        >
          Back
        </Link>
        <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl uppercase text-white font-mono font-bold text-center md:mb-5 mb-4">
          Filter By Search
        </h1>
        <div className="flex items-center gap-4 mb-5 justify-center flex-wrap p-5 rounded-xl bg-black bg-opacity-40">
          <form
            onSubmit={submitFilter}
            className="flex flex-wrap justify-center items-center gap-3"
          >
            {/* ============= Select =========== */}
            <select
              aria-label="user-data"
              className="py-2 px-3 rounded-xl outline-none"
              onChange={(e) => setOption(e.target.value as keyof dataType)}
            >
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="email">Email</option>
            </select>
            {/* ======= SEARCH INPUT ========== */}
            <input
              className="border-2 border-solid border-transparent hover:border-green-500 hover:shadow-lg hover:shadow-green-100 duration-300 sm:px-4 sm:py-2 px-3 py-1 outline-none rounded-xl"
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`${option}`}
            />
            {/* ========= SEARCH BUTTON ========== */}
            <button className="px-6 py-1 leading-[150%] text-xl font-bold font-mono text-black rounded-lg bg-white border border-transparent hover:border-white hover:text-black duration-300 hover:scale-[.95] inline-block">
              Search
            </button>
          </form>

          {/* ============= RANGE INPUTS ============ */}
          <form
            // onSubmit={rangeHandler}
            className="flex items-center gap-4 flex-wrap justify-center"
          >
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <p className="text-xl text-white font-medium">Range:</p>
              <div className="flex items-center gap-2">
                <input
                  className="border-2 min-w-10 max-w-16 border-solid border-transparent hover:border-green-500 hover:shadow-lg hover:shadow-green-100 duration-300 sm:px-4 sm:py-2 px-3 py-1 outline-none rounded-xl"
                  type="number"
                  placeholder="0"
                  onChange={(e) => setFirstRange(Number(e.target.value))}
                />
                <p className="text-xl text-white font-medium">to</p>
                <input
                  className="border-2 min-w-10 max-w-16 border-solid border-transparent hover:border-green-500 hover:shadow-lg hover:shadow-green-100 duration-300 sm:px-4 sm:py-2 px-3 py-1 outline-none rounded-xl"
                  type="number"
                  placeholder="0"
                  onChange={(e) => setSecondRange(Number(e.target.value))}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="mt-5 p-5 bg-black bg-opacity-40 rounded-xl max-w-[800px] w-full mx-auto overflow-x-auto">
          {filterTable.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-white font-semibold">Sr No.</th>
                  <th className="text-white font-semibold">First Name</th>
                  <th className="text-white font-semibold">Last Name</th>
                  <th className="text-white font-semibold">Email</th>
                </tr>
              </thead>
              <tbody>
                {filterTable.map((obj, i) => {
                  return (
                    <tr key={i}>
                      <td className="text-white font-medium">{i + 1}</td>
                      <td className="text-white font-medium">
                        {obj.firstName}
                      </td>
                      <td className="text-white font-medium">{obj.lastName}</td>
                      <td className="text-white font-medium">{obj.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="font-medium text-white text-xl text-center">
              No Data Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
