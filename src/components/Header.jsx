import { House, Info } from "lucide-react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="vite.svg" alt="Logo" />
        <h1>Bioskop Alama</h1>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <House />
            <Link to="/">Film</Link>
          </li>
          <li className="nav-item">
            <Info />
            <Link to="/About">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
