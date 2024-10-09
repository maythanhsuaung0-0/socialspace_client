"use client";
import React, { useState } from "react";
import http from "../src/app/http.js";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MdThumbUp, MdComment, MdShare } from 'react-icons/md';
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

interface PostDetails {
  post: string;
  UserId: number;
  created_at: string;
}
const PostCard = (post: { post: PostDetails }) => {
  const [name, setName] = useState(" ");
  const fetch = async () => {
    const user = await http.get("/users/" + post.post.UserId);
    setName(user.data.name);
  };
  const content = post.post;
  const time = dayjs((content.created_at));
  const timediff = time.fromNow();
  fetch();
  return (
    <div className=" my-3 rounded-md w-full shadow-sm bg-[#242526]">
      <div className="grid px-4 pt-4 grid-cols-[3rem_auto] gap-2">
        <div className="rounded-full grid self-center justify-center w-12 h-12 bg-red-400 text-white">
          <span className="self-center">{name.slice(0,1)}</span>
        </div>
        <div className="self-center capitalize font-semibold">
          <div>{name}</div>
          <div className="text-xs text-gray-300">{timediff}</div>
        </div>
      </div>
      <div className="py-3 px-4 pb-4 rounded-full w-full  text-gray-100">
        {content.post}
      </div>
      <div className="flex px-4 justify-between border-t border-[#3A3B3C]">
        <button className="text-white text-md flex-1 rounded-sm px-4 py-2  hover:bg-[rgba(58,59,60,0.45)]">
          <MdThumbUp className="inline-block mr-2" /> 
          Like</button>
        <button className="text-white text-md flex-1 rounded-sm px-4 py-2  hover:bg-[rgba(58,59,60,0.45)]">
          <MdComment className="inline-block mr-2" />
          Comment</button>
        <button className="text-white text-md flex-1 rounded-sm px-4 py-2  hover:bg-[rgba(58,59,60,0.45)]">
          <MdShare className="inline-block mr-2" />
          Share</button>
      </div>
    </div>
  );
};

export default PostCard;
