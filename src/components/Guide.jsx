import React, { useState } from "react";
import rule1 from "../assets/img/rule1.png";
import rule2 from "../assets/img/rule2.png";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";

export default function Guide(props) {
	return (
		<Popup
			position="right center"
			open={props.isOpen}
			closeOnDocumentClick
			onClose={props.toggleOpen}
		>
			<section className="guide-popup">
				<div className="guide-rule">
					<h4 className="guide-rule-content">Replique o seu jogo atual.</h4>
					<img src={rule1} alt="" />
				</div>
				<div className="guide-rule">
					<h4 className="guide-rule-content">
						Clique na letra para selecionar o seu valor.
					</h4>
					<img src={rule2} alt="" />
				</div>
				<div className="guide-rule">
					<ul className="colors-ul">
						<li>
							Letras <span className="span-grey">cinzas</span> não estão na
							palavra.
						</li>
						<li>
							Letras <span className="span-yellow">amarelas</span> estão na
							palavra, mas não na atual posição.
						</li>
						<li>
							Letras <span className="span-green">verdes</span> estão na
							posição correta.
						</li>
					</ul>
					<div className="guide-rule">
						<h4
							className="guide-rule-content"
							style={{ textDecoration: "underline", fontWeight: 600 }}
						>
							Não use acentos!
						</h4>
					</div>
				</div>
			</section>
		</Popup>
	);
}
