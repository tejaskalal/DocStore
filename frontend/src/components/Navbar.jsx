import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <header className="container d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
      <div className="h4 text-dark">DocStore</div>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/" className="nav-link text-dark">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/documents/upload" className="nav-link text-dark">
            Upload Documents
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/documents/" className="nav-link text-dark">
            My Documents
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
