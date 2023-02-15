import React from "react";
import gitHubIcon from "../assets/img/github-icon.svg";
import lnIcon from "../assets/img/linkedin-icon.svg";
export default function Credits() {
	return (
		<div className="credits-wrapper">
			<h3 className="dev-by">Desenvolvido por Gabriel Gusso</h3>
			<div className="social-icons-wrapper">
				<a href="https://github.com/g-pg" target={"__blank"}>
					<img src={gitHubIcon} alt="ícone github" />
				</a>
				<a href="https://www.linkedin.com/in/gabriel-gusso-828045263/" target="__blank">
					<img src={lnIcon} alt="ícone linkedin" />
				</a>
			</div>
		</div>
	);
}
