import { useState, useEffect, useContext, useMemo } from "react";
import BlogCard from "../components/blogCard";
import { AuthContext } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
const Home = () => {
  const { userName } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [toast, setToast] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/blog/blogs?userName=${userName}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res) {
          throw new Error("failed to fetch data");
        }

        const data = await res.json();

        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setErrors(err.message);
        setIsLoading(false);
      }
    };
    if (userName) {
      fetchPost();
    }
  }, [userName]);

  const filterPost = useMemo(() => {
    // If the search bar is empty, return all items
    if (!search.trim()) return posts;

    // Otherwise, filter the items (case-insensitive)
    return posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, posts]);

  if (!userName) {
    return (
      <div className="flex flex-1 justify-center items-center w-screen h-screen">
        <div className="bg-white/20 border border-white/40 p-10 rounded-2xl shadow-xl text-center">
          <h1 className="text-3xl font-bold text-white mb-4">WELCOME !!</h1>
          <p className="text-white/90 text-lg">
            Please log in to view the home page.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="text-center w-full h-full flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-black-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (errors)
    return (
      <div className="text-center mt-10 text-red-500">Error: {errors}</div>
    );

  return (
    <div className=" relative flex flex-1 flex-col justify-center items-center p-10">
      <div className="w-full h-10 absolute top-0">
        <div className="flex justify-center items-center ">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            value={search}
            placeholder="Search"
            className="border-1 border-white rounded-xl p-1 w-[50%]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full max-w-7xl ">
        {filterPost.length > 0 ? (
          filterPost.map((post) => (
            <BlogCard key={post._id} post={post}></BlogCard>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
