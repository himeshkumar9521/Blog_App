import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const ShowCard = () => {
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      navigate("/home");
    } catch (err) {
      console.log("failed to delete", err);
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (!data) {
          setPost(null);
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("failed to fetch", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center p-6 w-screen">
      <div className="bg-white/30 border border-white/30 rounded-2xl p-6 w-[35%] m-10">
        {post.image && (
          <img
            src={post.image}
            alt="image"
            className="w-[90%] rounded-lg m-5 h-70 "
          />
        )}
        <p className="m-5 text-xl p-3">
          {post.isPrivate ? "PRIVATE" : "PUBLIC"}
        </p>
        <div>
          {post.user === userName && (
            <button
              onClick={handleDelete}
              className="m-4 p-3 text-white font-bold bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 transition">
              DELETE
            </button>
          )}
          {post.user === userName && (
            <button
              onClick={() => {
                navigate("/UpdatePost", { state: post });
              }}
              className="m-4 p-3 text-white font-bold bg-yellow-600 rounded-lg cursor-pointer hover:bg-yellow-800 transition">
              RESET
            </button>
          )}
        </div>
      </div>
      <div className="bg-white/30 border border-white/30 rounded-2xl p-6 w-[35%] m-10">
        <h1 className="text-3xl font-extrabold m-2">Title:-</h1>
        <p className="p-3 font-bold text-2xl">{post.title}</p>
        <h1 className="text-3xl font-extrabold m-2">Content:-</h1>
        <p className="m-5 text-xl p-3">{post.content}</p>
        <p className="text-slate-700 underline m-5 text-lg">By:- {post.user}</p>
      </div>
    </div>
  );
};

export default ShowCard;
