import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
const CreatePost = () => {
  const { userName, isLogin } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [finalResult, setfinalResult] = useState([]);
  const [isSuccess3, setIsSuccess3] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsSubmit(true);
      if (!isLogin) {
        setfinalResult({ message: "User must be logged in to post" });
      } else {
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("content", content);
        formdata.append("user", userName);
        formdata.append("image", image);
        formdata.append("isPrivate", isPrivate);
        const res = await fetch("http://localhost:3000/api/blog/create-post", {
          method: "POST",
          credentials: "include",
          body: formdata,
        });
        const data = await res.json();
        console.log(data);
        setfinalResult(data);
        if (Object.keys(data).length == 1) {
          setIsSuccess3(true);
          setIsSubmit(false);
        } else {
          setIsSuccess3(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isSubmit) {
    return (
      <div className="text-center w-full h-full flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-black-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div
      className={`flex-1 flex flex-col justify-center items-center w-full h-full `}>
      {Object.keys(finalResult).length > 0 && (
        <div
          className={`w-[22%] ${isSuccess3 ? `bg-green-300/30 rounded-lg border border-green-500` : `bg-red-300/30 rounded-lg border border-red-500`}`}>
          <ol
            className={`${isSuccess3 ? `text-green-800` : `text-red-500`} m-5`}>
            {Object.entries(finalResult)
              .filter(([key]) => key !== "msg")
              .map(([id, message]) => (
                <li key={id}>{message}</li>
              ))}
          </ol>
        </div>
      )}
      <div className=" flex flex-col justify-center items-center w-80 m-4 bg-white/20 border border-white/40 rounded-2xl p-8 shadow-xl">
        <h1 className="font-bold text-2xl m-2">CREATE-POST</h1>
        <form className="text-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className=" border border-gray-300 rounded-lg m-3 p-1"
          />
          <div
            onInput={(e) => {
              setContent(e.currentTarget.innerText);
            }}
            contentEditable="true"
            className="border border-gray-300 rounded-lg p-1 text-lg h-23 w-full overflow-y-auto bg-white"></div>
          <div className="my-5 w-full">
            <label
              htmlFor="image"
              className="cursor-pointer block w-[100%] break-words text-center py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
              {image ? "UPLOADED" : "UPLOAD IMAGE"}
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden" // Hides the ugly default browser button
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label htmlFor="isprivate" className="m-2 text-lg font-bold">
              PRIVATE
            </label>
            <input
              onChange={(e) => {
                setIsPrivate(e.target.checked);
              }}
              id="isprivate"
              type="checkbox"
              className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <button
            disabled={isSubmit}
            type="submit"
            className="m-2 py-2 px-4 bg-purple-400 text-white border-none shadow-lg hover:bg-purple-600 rounded-lg">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
