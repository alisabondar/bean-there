import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <h1 className="title">VinylTheatre</h1>
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
        </nav>
      </header>
      <main className="h-screen">
        <Outlet />
      </main>
      <footer className="footer">
        <span>&copy; Wingardium Levicode - BeanThere - 2023</span>
      </footer>
    </div>
  );
}
