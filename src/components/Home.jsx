import React, { useState, useMemo, memo } from "react";
import WordleTable from "./WordleTable";
import { words } from "../data/words.js";
function Home() {
	const [possibleWords, setPossibleWords] = useState(words);
	const [renderWords, setRenderWords] = useState(false);
	const [incompleteLine, setIncompleteLine] = useState(true);

	function searchWords(wordleLines, event) {
		event.preventDefault();
		setPossibleWords(words);

		let onceCorrect = [];
		for (let i = 0; i < wordleLines.length; i++) {
			let line = wordleLines[i];

			let regexArray = [];
			let immutableIndexes = [];
			let excludedLetters = [];
			let mustHaveArray = [];
			let incompleteSquares = 0;
			line.forEach((letter, indexOfLetter) => {
				if (i === 0) {
					letter.letter === "" ? incompleteSquares++ : "";
				}

				if (letter.correctPosition) {
					regexArray[indexOfLetter] = letter.letter;
					immutableIndexes.push(indexOfLetter);
					mustHaveArray.push(`(?=.*${letter["letter"]})`);
					onceCorrect.push(letter.letter);
				} else if (
					!letter.correctPosition &&
					letter.exists &&
					immutableIndexes.indexOf(indexOfLetter) === -1
				) {
					regexArray[indexOfLetter] = `[^${letter["letter"]}]`;
					mustHaveArray.push(`(?=.*${letter["letter"]})`);
					onceCorrect.push(letter.letter);
				} else {
					regexArray[indexOfLetter] = `[A-Z]`;
				}

				if (!letter.exists && letter.letter) {
					excludedLetters.push(letter.letter);
					regexArray[indexOfLetter] = `[^${letter["letter"]}]`;
				}
			});

			if (incompleteSquares > 0) {
				setIncompleteLine(true);
				setRenderWords(true);
				break;
			} else {
				setIncompleteLine(false);
				let generalRegex = new RegExp(`${regexArray.join("")}`, "g");
				let mustHaveRegex = new RegExp(`${mustHaveArray.join("")}`, "g");

				excludedLetters = excludedLetters.filter((letter) => {
					return !onceCorrect.some((correctLetter) => letter === correctLetter);
				});
				let excludedRegex = new RegExp(`[^${excludedLetters.join("")}]{5}`, "g");

				filterWords(generalRegex, excludedRegex, mustHaveRegex);
			}
		}
	}

	function filterWords(generalRegex, excludedRegex, mustHaveRegex) {
		setPossibleWords((prevWords) => {
			return prevWords
				.filter((word) => word.toUpperCase().match(excludedRegex))
				.filter((word) => word.toUpperCase().match(mustHaveRegex))
				.filter((word) => word.toUpperCase().match(generalRegex));
		});

		setRenderWords(true);
	}

	function resetTable() {
		setRenderWords(false);
	}

	const contentEl = useMemo(() => {
		if (incompleteLine) {
			return "É preciso completar no mínimo a primeira linha.";
		} else if (possibleWords.length === 0) {
			return (
				<>
					Nenhuma palavra encontrada.
					<br />
					<br />
					Verifique se não há contradições na tabela ou se você está usando acentos.
				</>
			);
		} else if (possibleWords.length >= 500) {
			return (
				<>
					Há mais palavras possíveis que estrelas no céu.
					<br />
					<br />
					Complete a próxima linha e tente outra vez.
				</>
			);
		} else if (possibleWords.length >= 1) {
			return `${possibleWords.join(", ")}.`;
		}
	}, [possibleWords]);

	return (
		<>
			<WordleTable searchWords={searchWords} resetTable={resetTable} />
			<section className="possible-words container">
				{renderWords && <p className="possible-words-content">{contentEl}</p>}
			</section>
		</>
	);
}

export default React.memo(Home);
