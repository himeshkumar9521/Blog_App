import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { redirect, useNavigate } from "react-router-dom";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [finalResult, setfinalResult] = useState([]);
  const [isSuccess2, setIsSuccess2] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      userName: user,
      passWord: password,
    };
    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setfinalResult(result);
      if ("token" in result) {
        setIsSuccess2(true);
        login(user);

        navigate("/home", {
          replace: true,
        });
      } else {
        setIsSuccess2(false);
      }
    } catch (err) {}
  };

  return (
    <div
      className={`flex-1 flex flex-col justify-center items-center w-full h-full`}>
      {Object.keys(finalResult).length > 0 && (
        <div
          className={`w-[22%] ${isSuccess2 ? `bg-green-300/30 rounded-lg border border-green-500` : `bg-red-300/30 rounded-lg border border-red-500`}`}>
          <ol
            className={`${isSuccess2 ? `text-green-800` : `text-red-500`} m-5`}>
            {Object.entries(finalResult)
              .filter(([key]) => key !== "token")
              .map(([id, message]) => (
                <li key={id}>{message}</li>
              ))}
          </ol>
        </div>
      )}
      <div className=" flex flex-col justify-center items-center w-80 m-4 bg-white/20 border border-white/40 rounded-2xl p-8 shadow-xl">
        <h1 className="font-bold text-2xl m-2">LOG-IN</h1>
        <form className="text-center" onSubmit={handleLogin}>
          <input
            onChange={(e) => {
              setUser(e.target.value);
            }}
            type="text"
            placeholder="userName"
            className=" border border-gray-300 rounded-lg m-3 p-1"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            className="border border-gray-300 rounded-lg m-3 p-1"
          />
          <button
            type="submit"
            className="m-2 py-2 px-4 bg-purple-400 text-white border-none shadow-lg hover:bg-purple-600 rounded-lg">
            LOG-IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
