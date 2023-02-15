import React, { useState, useRef } from "react";
import gitHubIcon from "../assets/img/github-icon.svg";
import lnIcon from "../assets/img/linkedin-icon.svg";
export function Header(props) {
	const [burgerOpen, setburgerOpen] = useState(false);
	const headerRef = useRef();
	function openBurger() {
		setburgerOpen((prevburgerOpen) => !prevburgerOpen);
	}
	React.useEffect(() => {
		const headerHeight = headerRef.current.offsetHeight;
		document.querySelector(".main-nav").style.height = `calc(100vh - ${headerHeight}px)`;
	}, []);

	function handleGuideClick() {
		props.openGuide();
		setburgerOpen(false);
	}

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

					<h1 className="header-title">Wordle Finder</h1>
				</div>
			</header>
			<nav className={`main-nav ${burgerOpen ? "open" : ""}`}>
				<ul>
					<li>Home</li>
					<li onClick={handleGuideClick}>Guia</li>
					<li>Sobre</li>
				</ul>
				<div className="credits-wrapper">
					<h3 className="dev-by">
						Desenvolvido por
						<br /> Gabriel Gusso
					</h3>
					<div className="social-icons-wrapper">
						<a href="https://github.com/g-pg" target={"__blank"}>
							<img src={gitHubIcon} alt="ícone github" />
						</a>
						<a
							href="https://www.linkedin.com/in/gabriel-gusso-828045263/"
							target="__blank"
						>
							<img src={lnIcon} alt="ícone linkedin" />
						</a>
					</div>
				</div>
			</nav>
		</>
	);
}
