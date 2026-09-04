import { useNavigate } from "react-router-dom";
const BlogCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => {
        navigate(`/blog/${post._id}`);
      }}
      className="bg-white/30 border border-white/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {post.image ? (
        <img src={post.image} alt="image" className="w-full h-50 rounded-lg" />
      ) : (
        <img
          src="https://t3.ftcdn.net/jpg/15/49/09/82/360_F_1549098272_4fDtehzGZGsdElKwXmkEg61T5alSrufQ.jpg"
          alt="image"
          className="w-full h-50 rounded-lg"
        />
      )}
      <h2 className="text-xl font-bold text-black mt-5 truncate">
        {post.title}
      </h2>
      <p className="text-black mt-5 line-clamp-4">{post.content}</p>

      <p className="text-slate-700 underline m-4 text-lg">By:- {post.user}</p>
    </article>
  );
};

export default BlogCard;
