"use client";
import { useEffect, useState, useContext } from "react";
import http from "./http.js";
import CreatePostCard from "../../components/CreatePostCard";
import PostCard from "../../components/PostCard";
import { useUserContext } from "@/contexts/usercontext";
import Sidebar from "../../components/Sidebar";
type User = {
    id: number;
    name: string;
    email: string;
}
type Posts = {
    id: number;
    post: string;
    UserId: number;
    created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const {user} = useUserContext();	
  useEffect(() => {
    http.get("/posts").then((res) => {
      setPosts(res.data);	
    });
  }
  , [user]);
  return (
    <>
    
      {user? (
        <>
          <div className="grid pt-20 bg-[#18191A] min-h-screen gap-12">
          <Sidebar/>
            <div className="pt-1 w-[40%] m-auto" >
              <div><CreatePostCard user={user} /></div>
              <div>
              {
                posts && posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              }
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="m-[20em] text-white">loading...</div>
      )}
    </>
  );
}
