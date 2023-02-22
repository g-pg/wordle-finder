import Credits from "./Credits";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export function Header(props) {
	const [burgerOpen, setburgerOpen] = useState(false);
	const headerRef = useRef();
	const navRef = useRef();
	const burgerRef = useRef();
	function openBurger() {
		setburgerOpen((prevburgerOpen) => !prevburgerOpen);
	}
	useEffect(() => {
		const headerHeight = headerRef.current.offsetHeight;
		document.querySelector(".main-nav").style.height = `calc(100dvh - ${headerHeight}px)`;
	}, []);

	function handleGuideClick() {
		props.openGuide();
		setburgerOpen(false);
	}
	const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")) || "dark-theme");

	function toggleTheme() {
		setTheme((prevTheme) => {
			return prevTheme === "dark-theme" ? "light-theme" : "dark-theme";
		});
	}

	function handleClickOutsideNav(event) {
		if (!navRef.current.contains(event.target) && !burgerRef.current.contains(event.target)) {
			setburgerOpen(false);
		}
	}

	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(theme));
		document.body.className = theme;
	}, [theme]);

	useEffect(() => {
		// 	if (window.matchMedia("(max-width: 500px)").matches) {
		document.body.style.overflow = burgerOpen ? "hidden" : "unset";
		// 	}
	}, [burgerOpen]);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideNav);
		return () => {
			document.removeEventListener("mousedown", handleClickOutsideNav);
		};
	}, []);
	return (
		<>
			<header ref={headerRef}>
				<div className="d-flex">
					<div
						onClick={openBurger}
						className={`burger-container ${burgerOpen ? "open" : ""}`}
						ref={burgerRef}
					>
						<div className="burger-icon"></div>
					</div>
					<Link to="/">
						<h1 className="header-title">Wordle Finder</h1>
					</Link>
					<div className="theme-toggler" onClick={toggleTheme}>
						<div className="theme-toggler-ball"></div>
					</div>
				</div>
			</header>
			<nav className={`main-nav ${burgerOpen ? "open" : ""}`} ref={navRef}>
				<ul>
					<li onClick={() => setburgerOpen(false)}>
						<Link to="/">Home</Link>
					</li>
					<li onClick={handleGuideClick}>
						<p>Guia</p>
					</li>
					<li onClick={() => setburgerOpen(false)}>
						<Link to="/sobre">Sobre</Link>
					</li>
				</ul>
				<Credits />
			</nav>
		</>
	);
}
