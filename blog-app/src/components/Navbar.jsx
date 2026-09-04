import { MdOutlineCreate } from "react-icons/md";
import { FaSignInAlt } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
const NavBar = () => {
  const navigate = useNavigate();
  const { isLogin, logout, userName } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className=" flex justify-center items-center flex-row justify-between p-1 w-full">
      <div className="relative flex flex-row justify-between p-2 w-[70%] bg-[rgb(255,255,255)]/30 backdrop-filter: blur(10px) border border-solid border-white/20 text-white rounded-xl h-[80%]">
        <h1 className=" flex items-center mx-2 text-2xl font-bold tracking-wide text-white">
          BLOG APP
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden p-2 rounded-full border-1 border-white bg-gray-500/30 flex justify-center items-center active:bg-gray-400 transition">
          ☰
        </button>
        <ul className="list-none hidden md:flex flex-row justify-evenly p-1">
          <li className="flex items-center p-2 mx-2 bg-black/60 transition hover:bg-black/30 rounded-lg shadow-sm cursor-pointer">
            <span onClick={() => navigate("/home")} className="p-1">
              HOME
            </span>
          </li>
          <li className="flex items-center p-2 mx-2 bg-black/60 transition hover:bg-black/30 rounded-lg shadow-sm cursor-pointer">
            <span onClick={() => navigate("/create-post")} className="p-1">
              CREATE
            </span>
          </li>

          {isLogin ? (
            <>
              <li className="flex items-center p-1 mx-2 bg-black/60 transition hover:bg-black/30 rounded-lg shadow-sm cursor-pointer">
                <span onClick={() => navigate("/my-post")} className="p-1">
                  MY-POST
                </span>
              </li>
              <li className="flex items-center p-1 mx-2 bg-blue-600/30 transition border-3 border-gray-600 text-purple-900 hover:bg-blue-500 text-sans rounded-xl shadow-sm cursor-pointer">
                <span
                  onClick={() => navigate(`/user/${userName}`)}
                  className=" p-1">
                  {userName}
                </span>
              </li>
            </>
          ) : (
            <li className="flex items-center p-1 mx-2 bg-black/60 transition hover:bg-black/30 rounded-lg shadow-sm cursor-pointer">
              <span onClick={() => navigate("/register")}>SIGN-IN</span>
            </li>
          )}
          {isLogin ? (
            <li className="flex items-center p-1 mx-2  bg-black/60 transition hover:bg-black/30 rounded-lg shadow-sm cursor-pointer">
              <span onClick={logout} className="p-1">
                LOG-OUT
              </span>
            </li>
          ) : (
            <li className="flex items-center p-1 mx-2 bg-black/60 transition hover:bg-black/30 rounded-lg shadow-sm cursor-pointer">
              <span onClick={() => navigate("/login")} className="p-1">
                LOG-IN
              </span>
            </li>
          )}
        </ul>
        {isOpen && (
          <div className="absolute top-full right-4 mt-2 w-48 bg-gray-200  rounded-lg shadow-xl py-2 z-50 md:hidden flex flex-col border border-gray-100">
            {isLogin && (
              <button
                className="px-4 py-2 text-left text-black hover:bg-gray-100 hover:text-purple-600 transition flex justify-center"
                onClick={() => navigate(`/user/${userName}`)}>
                <span className="p-2 bg-blue-100 border-2 border-blue-500 rounded-lg ">
                  {userName}
                </span>
              </button>
            )}
            <button
              className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition"
              onClick={() => navigate("/home")}>
              HOME
            </button>
            <button
              className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition"
              onClick={() => navigate("/create-post")}>
              CREATE
            </button>
            {isLogin ? (
              <button
                className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition"
                onClick={() => navigate("/my-post")}>
                MY-POST
              </button>
            ) : (
              <button
                className="px-4 py-2 text-left text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition"
                onClick={() => navigate("/register")}>
                SIGN-IN
              </button>
            )}

            <div className="border-t border-gray-100 mt-1 pt-2 px-4 pb-1">
              {isLogin ? (
                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-md transition shadow-sm"
                  onClick={logout}>
                  LOG-OUT
                </button>
              ) : (
                <button
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-2 rounded-md transition shadow-sm"
                  onClick={() => navigate("/login")}>
                  LOG-IN
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
