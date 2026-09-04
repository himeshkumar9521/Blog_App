import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/home";
import ShowCard from "./pages/card.jsx";
import CreatePost from "./pages/create-post";
import UpdatePost from "./pages/updatePost.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Social from "./pages/social.jsx";
import Welcome from "./pages/welcome.jsx";
import Account from "./pages/account.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "/home", element: <Social /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/create-post", element: <CreatePost /> },
      { path: "/my-post", element: <Home /> },
      { path: "/blog/:id", element: <ShowCard /> },
      { path: "/user/:userName", element: <Account /> },
      { path: "/UpdatePost", element: <UpdatePost /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
