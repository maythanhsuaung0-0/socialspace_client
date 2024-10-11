"use client";
import React, { useEffect, useState } from "react";
import http from "../src/app/http.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import { MdThumbUp, MdComment, MdShare, MdSend } from "react-icons/md";
import { useUserContext } from "@/contexts/usercontext";
import { useFormik } from "formik";
import * as yup from "yup";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

interface PostDetails {
  id: number;
  post: string;
  UserId: number;
  created_at: string;
}
interface LikeDetails {
  PostId: number;
  UserId: number;
  created_at: string;
}

interface CommentDetails {
  User: string;
  Comment: string;
  created_at: string;
}
const PostCard = (post: { post: PostDetails }) => {
  const [likeId, setlikeId] = useState<null | number>(null);
  const [postOwner, setPostOwner] = useState<null | string>(null);
  const [postLikes, setPostLikes] = useState<null | Array<Object>>(null);
  const [comment, setcomment] = useState(false);
  const [postComment, setPostComment] = useState<null | Array<CommentDetails>>(
    null
  );
  const { user } = useUserContext();
  const content = post.post;
  const time = dayjs(content.created_at);
  const timediff = time.fromNow();
  const initialValues = {
    comment: "",
    PostId: 0,
    UserId: 0,
    created_at: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      comment: yup.string().required("Comment is required"),
    }),
    onSubmit: async (val) => {
      const data = {
        comment: val.comment,
        PostId: content.id,
        UserId: user.id,
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      console.log("data", data);
      await http
        .post("/comments/post", data)
        .then((res) => {
          console.log("successfully commented");
          formik.resetForm();
          fetchComments()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  const fetch = async () => {
    try {
      const { data } = await http.post("/likes/getByUser", {
        UserId: user.id,
        PostId: content.id,
      });

      if (data?.length > 0) {
        console.log("like for this post", data[0].id);
        setlikeId(data[0].id);
      } else {
        setlikeId(null);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const fetchUser = async () => {
    try {
      const { data } = await http.post(`/users/getUserById`, {
        id: content.UserId,
      });
      setPostOwner(data.name);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchLikes = async () => {
    try {
      const { data } = await http.post("/likes/getByPost", {
        PostId: content.id,
      });
      if (data?.length > 0) {
        setPostLikes(data);
      } else {
        setPostLikes(null);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const fetchComments = async () => {
    const { data } = await http.post("/comments/getByPost", {
      PostId: content.id,
    });
    let comments = [];
    if (data?.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let commentDetail: CommentDetails;
        const { data: user } = await http.post(`/users/getUserById`, {
          id: data[i].UserId,
        });
        commentDetail = {
          User: user.name,
          Comment: data[i].comment,
          created_at: data[i].created_at,
        };
        comments.push(commentDetail);
      }
      console.log(comments);
      setPostComment(comments);
    } else {
      setPostComment(null);
    }
  };
  useEffect(() => {
    fetch();
    fetchUser();
   fetchComments()
    fetchLikes();
  }, [likeId]);
  const addLike = async () => {
    if (!likeId) {
      const data: LikeDetails = {
        PostId: content.id,
        UserId: user.id,
        created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      };
      const like = await http.post("/likes/add", data);
      setlikeId(like.data.id);
    } else {
      console.log("like is removed");
      http.delete(`/likes/${likeId}`).then((res) => {
        setlikeId(null);
      });
    }
  };
  // 09882732105 ( U tin tun aung )
  const commentOn = () => {
    setcomment(!comment);
  };
  return (
    <div className=" my-3 rounded-none lg:rounded-md w-full shadow-sm bg-[#242526]">
      <div className="grid px-4 pt-4 grid-cols-[3rem_auto] gap-2">
        <div className="rounded-full grid self-center justify-center w-12 h-12 bg-red-400 text-white">
          <span className="self-center uppercase font-semibold">
            {postOwner?.slice(0, 1)}
          </span>
        </div>
        <div className="self-center capitalize font-semibold">
          <div>{postOwner}</div>
          <div className="text-xs text-gray-300">{timediff}</div>
        </div>
      </div>
      <div className="py-3 px-4 pb-4 rounded-full w-full  text-gray-100">
        {content.post}
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex gap-2 text-sm px-4 py-2">
          <MdThumbUp className={`inline-block text-blue-500 self-center`} />{" "}
          <span className="text-gray-100 self-center">{postLikes?.length}</span>
        </div>
        {postComment ? (
          <div onClick={commentOn} className="flex gap-2 text-sm px-4 py-2">
            <MdComment className={`inline-block text-blue-500 self-center`} />{" "}
            <span className="text-gray-100 self-center">
              {postComment.length}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex px-4 justify-between border-t border-b border-[#3A3B3C]">
        <button
          onClick={addLike}
          className={`${
            likeId
              ? "text-blue-500 text-md flex-1 rounded-sm px-4 py-2  hover:bg-[rgba(58,59,60,0.45)]"
              : "text-gray-100 text-md flex-1 rounded-sm px-4 py-2  hover:bg-[rgba(58,59,60,0.45)]"
          }`}
        >
          <MdThumbUp className={`inline-block mr-2 `} />
          {likeId ? "liked" : "Like"}
        </button>
        <button
          onClick={commentOn}
          className="text-white text-md flex-1 rounded-sm px-4 py-2  hover:bg-[rgba(58,59,60,0.45)]"
        >
          <MdComment className="inline-block mr-2" />
          Comment
        </button>
        <button className="text-white text-md flex-1 rounded-sm px-4 py-2  hover:bg-[rgba(58,59,60,0.45)]">
          <MdShare className="inline-block mr-2" />
          Share
        </button>
      </div>
      {comment ? (
        <>
          {postComment ? (
            <div className="">
              {" "}
              {postComment.map((e) => {
                return <div className="pt-3 pb-1 flex flex-row gap-2 px-4">
                  <div className="rounded-full grid self-start justify-center w-10 h-10 bg-red-400 text-white">
                    <span className="self-center uppercase">{e.User.slice(0,1)}</span>
                  </div>
                  <div className="rounded-md bg-[rgba(58,59,60,0.45)] p-3 grid gap-1">
                    <span className="font-bold capitalize" >{e.User}</span>
                    {e.Comment}
                  </div>
                </div>
              })}
            </div>
          ) : (
            <></>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="py-3 flex flex-row gap-2 px-4">
              <div className="rounded-full grid self-start justify-center w-10 h-10 bg-red-400 text-white">
                <span className="self-center">{user.name[0]}</span>
              </div>
              <div className="rounded-md bg-[rgba(58,59,60,0.45)] flex flex-row">
                <textarea
                  rows={5}
                  cols={50}
                  aria-expanded={true}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="comment"
                  id="comment"
                  placeholder={`Comment as ${user.name}?`}
                  className=" w-full text-gray-100 text-sm bg-transparent focus:outline-none p-3"
                ></textarea>
                <button
                  type="submit"
              className="ml-auto mt-auto mb-3 mr-3 p-3 hover:bg-[#3A3B3C] rounded-full hover:text-blue-500"
                >
                  <MdSend />
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostCard;
