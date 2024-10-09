"use client";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import http from "../../http.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();
  interface SignUpForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const validationSchema = yup.object().shape({
    name: yup.string().min(3).required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });
  const initialValues: SignUpForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const submission = async (values: SignUpForm) => {
    http
      .post("/users/register", values)
      .then((response) => {
        toast.success("User registered successfully");
        router.push("/account/login");
      })
      .catch((err) => {
        if(err.response){
          for (let i = 0; i < err.response.data.errors.length; i++) {
            toast.error(err.response.data.errors[i]);
          }
        }
      });
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submission,
  });
  return (
    <>
      <div className="grid self-center h-screen bg-[#fff]">
        <div className="grid gap-4 w-[30%] m-auto border border-gray-300 shadow-sm px-8 py-8 rounded-md">
          <h1 className="text-2xl font-bold text-center text-black">
            Social Space
          </h1>
          <span className="text-gray-400 text-sm text-center">
            Sign up now to connect with friends.
          </span>
          <button className="w-full p-2 my-2 bg-blue-500 text-white rounded-md">
            Login with Google
          </button>
          <div className="flex flex-row gap-3">
            <hr className="flex-1 self-center border border-gray-200" />
            <span className="text-gray-400 self-center">OR</span>
            <hr className="flex-1 self-center border border-gray-200" />
          </div>

          <form className="w-fit" onSubmit={formik.handleSubmit}>
            <input
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Username"
              className="w-full p-2 bg-gray-50 text-black my-2 border border-gray-300 rounded-md"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-500 text-xs">{formik.errors.name}</div>
            ) : null}
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Email"
              className="w-full p-2 bg-gray-50 text-black my-2 border border-gray-300 rounded-md"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            ) : null}
            <input
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
              className="w-full p-2 bg-gray-50 text-black my-2 border border-gray-300 rounded-md"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-500 text-xs">
                {formik.errors.password}
              </div>
            ) : null}
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Confirm Password"
              className="w-full p-2 bg-gray-50 text-black my-2 border border-gray-300 rounded-md"
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className="text-red-500 text-xs">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <button
              type="submit"
              className="w-full cursor-pointer p-2 my-2 bg-blue-500 text-white rounded-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
