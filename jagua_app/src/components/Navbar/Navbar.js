import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import LogoLink from "./LogoLink.js";

import "./Navbar.css";

const Navbar = () => {
  const location = useLocation(); // Obtenha a localização atual usando o hook useLocation do React Router
  const [highlightStyle, setHighlightStyle] = useState({
    // Estado para armazenar o estilo do destaque
    left: 0,
    width: 0,
    opacity: 0,
    transition: "1.2s",
  });

  useEffect(() => {
    const navLinks = document.querySelectorAll(".navLink");

    navLinks.forEach((link) => {
      if (link.pathname === location.pathname) {
        link.classList.add("active");
        updateHighlight(link); // Atualize o destaque quando a localização muda
      } else {
        link.classList.remove("active");
      }
    });
  }, [location]);

  const updateHighlight = (link) => {
    const { offsetLeft, offsetWidth } = link;
    const newHighlightStyle = {
      ...highlightStyle,
      left: offsetLeft + "px",
      width: offsetWidth + "px",
      opacity: 0.7,
    };
    setHighlightStyle(newHighlightStyle);
  };

  const handleMouseOver = (e) => {
    updateHighlight(e.target);
  };

  const handleMouseOut = () => {
    const activeLink = document.querySelector(".navLink.active");
    if (activeLink) {
      updateHighlight(activeLink);
    } else {
      setHighlightStyle((prevStyle) => ({
        ...prevStyle,
        opacity: 0,
      }));
    }
  };

  const handleResize = () => {
    const activeLink = document.querySelector(".navLink.active");
    if (activeLink) {
      updateHighlight(activeLink);
    } else {
      setHighlightStyle((prevStyle) => ({
        ...prevStyle,
        opacity: 0,
      }));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="myHeader">
      <nav>
        <input type="checkbox" className="check" />
        <label htmlFor="check" className="toggleResponsiveMenu">
          <i className="fas fa-bars"></i>
        </label>

        <LogoLink />

        <ul>
          <li>
            <Link
              to="/"
              className="navLink"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/aboutMe"
              className="navLink"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Sobre mim
            </Link>
          </li>
          <li>
            <Link
              to="/stickers"
              className="navLink"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Adesivos
            </Link>
          </li>
          <li>
            <Link
              to="/prints"
              className="navLink"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Prints
            </Link>
          </li>
          <li>
            <Link
              to="/shirts"
              className="navLink"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Camisetas
            </Link>
          </li>

          <div id="highlightNavBar" style={highlightStyle}></div>
        </ul>

        <Link to="/login" className="loginButton">
          Entrar
        </Link>
        <div className="smartphoneLogin">
          <Link to="/login">
            <i className="fas fa-sign-in-alt"></i>
          </Link>
        </div>
      </nav>

      <Outlet />
    </header>
  );
};

export default Navbar;