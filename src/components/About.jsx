import React from "react";
import Credits from "./Credits";
import gameExample from "../assets/img/about-game-example.png";
export default function About() {
	return (
		<>
			<div className="text-section">
				<section className="about container">
					<h1 className="about-title">Sobre</h1>
					<p className="about-text">
						No jogo{" "}
						<a
							href="https://www.nytimes.com/games/wordle/index.html"
							className="about-link"
							target="__blank"
						>
							Wordle
						</a>
						, criado por Josh Wardle (no Brasil, a versão mais conhecida chama-se{" "}
						<a href="https://term.ooo/" className="about-link" target="__blank">
							Termo
						</a>
						), o jogador deve descobrir uma palavra secreta de cinco letras em até
						seis tentativas. <br />
						<br /> A cada tentativa, o jogo sinaliza se as letras preenchidas
						estão na <span className="span-green">posição correta </span>, na{" "}
						<span className="span-yellow">posição errada</span>, ou se{" "}
						<span className="span-grey">não existem</span> na palavra.
					</p>
					<img src={gameExample} alt="Amostra de funcionamento do Wordle" />
					<p className="about-text">
						Esta aplicação foi criada em React.js com fins educacionais. <br />
						<br />
						Ela utiliza esta{" "}
						<a href="https://www.ime.usp.br/~pf/dicios/">
							lista de todas as palavras do português brasileiro
						</a>{" "}
						mantida pelo Instituto de Matemática e Estatística da USP como base de
						dados. <br />
						<br />
						Para utilizá-la, basta replicar o seu jogo atual e buscar as palavras
						possíveis. São renderizadas no máximo 500 palavras a cada busca.
					</p>
					<h1 className="about-title" style={{ marginTop: "3rem" }}>
						#Dev
					</h1>
					<p className="about-text">
						Encontrou algum bug ou acha que pode melhorar a aplicação? Crie um
						pull request no{" "}
						<a href="https://github.com/g-pg/wordle-finder" target="__blank">
							repositório!
						</a>{" "}
					</p>
				</section>
				<Credits />
			</div>
		</>
	);
}
