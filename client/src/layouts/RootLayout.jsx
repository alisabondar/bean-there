import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <div>
      <header className="header absolute top-0 block w-screen left-0">
        <nav className="nav">
          <h1 className="title">BeanThere</h1>
          <NavLink className="nav__link" to="/">
            Home
          </NavLink>
          <NavLink className="nav__link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav__link" to="/register">
            Register
          </NavLink>
          <NavLink className="nav__link" to="/profile">
            Profile
          </NavLink>
          <NavLink className="nav__link" to="/messenger">
            Messenger
          </NavLink>
          <NavLink className="nav__link" to="/location">
            Location
          </NavLink>
          <NavLink className="nav__link" to="/search">
            Search
          </NavLink>
          <NavLink className="nav__link" to="/company">
            CompanyPage
          </NavLink>
        </nav>
      </header>
      </div>
      <main>
        <Outlet />
      </main>
      <div>
      <footer className="footer bottom-0 block w-screen left-0 mt-10">
        <span>&copy; Wingardium Levicode - BeanThere - 2023</span>
      </footer>
      </div>
    </div>
  );
}
