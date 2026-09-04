import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [bodyResult, setBodyResult] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const { setIsLogin, setUserName , login } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password != Cpassword) {
      setIsSuccess(false);
      setBodyResult([{ msg: "passwords not match" }]);
      return;
    }
    const data = {
      userName: user,
      email: email,
      passWord: password,
    };
    try {
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.errors) {
        setBodyResult(result.errors);
        setIsSuccess(false);
      } else if (result.message) {
        setBodyResult([{ msg: result.message }]);
        setIsSuccess(true);
        setIsLogin(true);
        login(user);
        setUserName(user);

        navigate("/home", {
          replace: true, // <-- This travels to the next page!
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`flex-1 ${isSuccess ? `flex flex-col` : `flex`} justify-center items-center w-full h-full`}>
      {bodyResult.length > 0 && (
        <div
          className={`w-[22%] ${isSuccess ? `bg-green-300/30 rounded-lg border border-green-500` : `bg-red-300/30 rounded-lg border border-red-500`}`}>
          <ol
            className={`${isSuccess ? `text-green-800` : `text-red-500`} m-5`}>
            {bodyResult.map((item, index) => (
              <li key={index}>{item.msg}</li>
            ))}
          </ol>
        </div>
      )}
      <div className=" flex flex-col justify-center items-center w-80 m-4 bg-white/20 border border-white/40 rounded-2xl p-8 shadow-xl">
        <h1 className="font-bold text-2xl m-2">SIGN-IN</h1>
        <form onSubmit={handleRegister} className="text-center">
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
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="email"
            className="border border-gray-300 rounded-lg m-3 p-1"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Create password"
            className="border border-gray-300 rounded-lg m-3 p-1"
          />
          <input
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            type="password"
            placeholder="confirm password"
            className="border border-gray-300 rounded-lg m-3 p-1"
          />
          <button
            type="submit"
            className="m-2 py-2 px-4 bg-purple-400 text-white border-none shadow-lg hover:bg-purple-600 rounded-lg">
            SIGN-IN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
