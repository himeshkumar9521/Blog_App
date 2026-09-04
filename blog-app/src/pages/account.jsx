import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Account = () => {
  const navigate = useNavigate();
  const { userName, logout } = useContext(AuthContext);

  if (!userName) return null;

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${userName}`, {
        method: "DELETE",
      });

      // 1. Parse the JSON sent from your backend
      const data = await res.json();

      // 2. Check if the status code was bad (like 404 or 500)
      if (!res.ok) {
        // Throw the exact error message from your backend catch block
        throw new Error(data.message || "Something went wrong on the server");
      }

      // 3. ONLY log out and navigate if the deletion was 100% successful
      logout();
      navigate("/home");
    } catch (err) {
      // 4. This will now log the EXACT backend error so we can fix it!
      console.error("Deletion failed:", err.message);
      alert(`Could not delete: ${err.message}`);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className=" flex flex-col justify-center items-center w-80 m-4 bg-white/20 border border-white/40 rounded-2xl p-8 shadow-xl">
        <div className="p-10 m-7 rounded-full text-white text-3xl font-bold bg-blue-800">
          {userName[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold">username:</h2>
          <p className="text-lg">{userName}</p>
        </div>
        <div className="m-4">
          <button
            onClick={handleDelete}
            className="m-4 p-3 text-white font-bold bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
