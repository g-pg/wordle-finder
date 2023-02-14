import React, { useState, useRef } from "react";
import Guide from "./Guide";
export function Header(props) {
	const [burgerOpen, setburgerOpen] = useState(false);
	const headerRef = useRef();
	function openBurger() {
		setburgerOpen((prevburgerOpen) => !prevburgerOpen);
		console.log(burgerOpen);
	}
	React.useEffect(() => {
		const headerHeight = headerRef.current.offsetHeight;
		document.querySelector(".main-nav").style.height = `calc(100vh - ${headerHeight}px)`;
	}, []);

	const [showPopup, setShowPopup] = useState(false);
	function handleGuideClick() {
		setShowPopup((show) => !show);
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

					<h1 className="header-title">Wordle Helper</h1>
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
						<a href="">
							a<img src="" alt="" />
						</a>
						<a href="">
							a<img src="" alt="" />
						</a>
						<a href="">
							a<img src="" alt="" />
						</a>
					</div>
				</div>
			</nav>
			{showPopup && <Guide onClick={() => setShowPopup(false)} />}
		</>
	);
}
