"use client";
import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import * as yup from "yup";
import { useFormik } from "formik";
import http from "../src/app/http.js";
import dayjs from "dayjs";

type userType = {
  id: number;
    name: string;
    email: string;
};
interface UserProps{
    user:userType
}
interface PostProps{
    post:string;
    UserId:number;
    created_at:string;
}

const CreatePostCard = ( props:UserProps) => {
    const user = props.user;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const initialValues: PostProps = {
    post: "",
    UserId: 0,
    created_at: "",
  }

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      post: yup.string().required("Post is required"),
    }),
    onSubmit: (values) => {
      // const singaporeTime = dayjs().tz('Asia/Singapore').format('YYYY-MM-DD HH:mm:ss');
      const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
      let postToCreate:PostProps = {
        post: values.post,
        UserId: user.id,
        created_at: date
      };
      console.log("postToCreate",postToCreate);
      http.post("/posts/create", postToCreate).then((res) => {
        setIsOpen(false);
        formik.resetForm();
        window.location.reload();
      });
    },
  });
  return (
    <div className="p-4 rounded-none lg:rounded-md w-full shadow-sm bg-[#242526]">
      <div className="grid grid-cols-[3rem_auto] gap-2">
        <div className="rounded-full grid self-center justify-center w-12 h-12 bg-red-400 text-white">
          <span className="self-center">{user.name[0]}</span>
        </div>
        <div
          onClick={handleOpen}
          className="py-3 px-5 rounded-full w-full bg-[#3A3B3C] hover:bg-[#4b4c4e] text-gray-100"
        >
          What's on your mind, {user.name}?
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-[60] bg-[#1a1b1c8e] grid justify-center backdrop-blur-sm top-0 left-0 w-full h-full text-white">
          <div className="bg-[#242526] text-white w-[400px] lg:w-[500px] rounded-md h-fit self-center border border-[#414244]">
            <div className="flex flex-row w-full p-5  border-b border-[#414244]">
              <div className="text-center flex-[3]  text-lg">Create Post</div>
              <div className="ml-auto">
                <button
                  onClick={handleOpen}
                  className="text-white w-fit bg-[#414244] p-2 rounded-full"
                >
                  <IoCloseOutline />
                </button>
              </div>
            </div>
            <div className="py-4 px-3">
              <div className="grid grid-cols-[3rem_auto] gap-1">
                <div className="rounded-full grid self-start justify-center w-10 h-10 bg-red-400 text-white">
                  <span className="self-center">{user.name[0]}</span>
                </div>
                <div className="self-center capitalize font-semibold">
                  {user.name}
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="border-b border-[#414244] py-4">
                  <textarea
                    rows={5}
                    cols={50}
                    aria-expanded={true}
                    value={formik.values.post}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="post"
                    id="post"
                    placeholder={`What's on your mind, ${user.name}?`}
                    className=" w-full text-gray-100 bg-transparent focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 mt-4 text-white p-2 rounded-md w-full"
                >
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostCard;
