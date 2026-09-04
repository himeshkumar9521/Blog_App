import "./App.css";
import NavBar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Social from "./pages/social";
function App() {
  return (
    <div className=" h-screen flex flex-col w-screen shrink-0">
      <NavBar></NavBar>
      <Outlet />
    </div>
  );
}

export default App;
