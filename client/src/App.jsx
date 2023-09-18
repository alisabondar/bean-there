import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Location from "./pages/Location";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Company from "./pages/Company";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home/>}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/messenger" element={<Messenger />} />
      <Route path="/location" element={<Location />} />
      <Route path="/search" element={<Search />} />
      <Route path="/company" element={<Company />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
