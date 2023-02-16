import Credits from "./Credits";
import React, { useState, useRef, useEffect } from "react";

export function Header(props) {
	const [burgerOpen, setburgerOpen] = useState(false);
	const headerRef = useRef();
	const navRef = useRef();
	function openBurger() {
		setburgerOpen((prevburgerOpen) => !prevburgerOpen);
	}
	useEffect(() => {
		const headerHeight = headerRef.current.offsetHeight;
		document.querySelector(".main-nav").style.height = `calc(100vh - ${headerHeight}px)`;
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

	function handleChangePage(page) {
		props.changePage(page);
		setburgerOpen(false);
	}

	function handleClickOutsideNav(event) {
		if (!navRef.current.contains(event.target)) setburgerOpen(false);
	}
	useEffect(() => {
		localStorage.setItem("theme", JSON.stringify(theme));
		document.body.className = theme;
	}, [theme]);

	useEffect(() => {
		document.body.style.overflow = burgerOpen ? "hidden" : "unset";
	}, [burgerOpen]);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutsideNav);
		console.log("add");
		return () => {
			console.log("return");
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
					>
						<div className="burger-icon"></div>
					</div>
					<h1 className="header-title" onClick={() => handleChangePage("home")}>
						Wordle Finder
					</h1>
					<div className="theme-toggler" onClick={toggleTheme}>
						<div className="theme-toggler-ball"></div>
					</div>
				</div>
			</header>
			<nav className={`main-nav ${burgerOpen ? "open" : ""}`} ref={navRef}>
				<ul>
					<li onClick={() => handleChangePage("home")}>Home</li>
					<li onClick={handleGuideClick}>Guia</li>
					<li onClick={() => handleChangePage("about")}>Sobre</li>
				</ul>
				<Credits />
			</nav>
		</>
	);
}
