import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <header>
      <div className="navbar">
        <Link to="/" className="logo-title">
          <h2>Bookshelf</h2>
        </Link>
        <nav>
          {isLoggedIn ? (
            <>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="authBtn">Signup</button>
              </Link>
              <Link to="/login">
                <button className="authBtn">Login</button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
