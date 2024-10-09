import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { GoBookmarkFill } from "react-icons/go";
const Sidebar = () => {
  return (
    <div className="fixed top-[4em] left-0 h-screen w-[20%]">
      <ul className="grid gap-1 ml-2">
        <li>
          <div className="grid grid-cols-[23%_auto] hover:bg-[#242526] px-5 py-2 cursor-pointer rounded-md">
            <span className="self-center">
              <div className="rounded-full grid self-center justify-center w-8 h-8 bg-red-400 text-white">
                <span className="self-center">M</span>
              </div>
            </span>
            <span className="self-center">May than hsu</span>
          </div>
        </li>
        <li>
           <div className="grid grid-cols-[23%_auto] hover:bg-[#242526] px-5 py-2 cursor-pointer rounded-md">
            <span className="self-center text-2xl">
              {" "}
              <FaUserFriends />
            </span>
            <span className="self-center">Friends</span>
          </div>
        </li>
        <li>
           <div className="grid grid-cols-[23%_auto] hover:bg-[#242526] px-5 py-2 cursor-pointer rounded-md">
            <span className="self-center text-2xl">
              <GoBookmarkFill />
            </span>
            <span className="self-center">Saved</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
