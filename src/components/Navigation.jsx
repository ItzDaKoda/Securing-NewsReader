import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useArticles } from "../context/ArticlesContext";

function Navigation() {
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getUserSavedArticles } = useArticles();

  const userSaved = getUserSavedArticles();

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <h1 className="nav-brand">NewsReader</h1>

          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>

            <Link
              to="/search"
              className={`nav-link ${
                location.pathname === "/search" ? "active" : ""
              }`}
            >
              Search
            </Link>

            <Link
              to="/saved"
              className={`nav-link ${
                location.pathname === "/saved" ? "active" : ""
              }`}
            >
              Saved Articles ({userSaved.length})
            </Link>

            {isAdmin() && (
              <Link
                to="/admin"
                className={`nav-link ${
                  location.pathname === "/admin" ? "active" : ""
                }`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="nav-user">
          {isAuthenticated() ? (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span>
                {user.username} {user.role === "admin" ? "(admin)" : ""}
              </span>
              <button className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;