import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Company from "./pages/Company";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/messenger" element={<Messenger />} />
      <Route path="/search" element={<Search />} />
      <Route path="/company" element={<Company />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
