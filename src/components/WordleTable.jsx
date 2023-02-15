import React, { useState, useEffect } from "react";
import { words } from "../data/words.js";
import WordleLine from "./WordleLine";
import resetIcon from "../assets/img/reset-icon.svg";

export default function WordleTable(props) {
	const [renderWords, setRenderWords] = useState(false);
	const [possibleWords, setPossibleWords] = useState(words);
	const [wordleLines, setWordleLines] = useState(() => feedLines());
	const [incompleteLine, setIncompleteLine] = useState(true);

	function feedLines() {
		let lines = [];
		for (let i = 0; i < 6; i++) {
			let line = [];
			for (let j = 0; j < 5; j++) {
				line.push({ letter: "", correctPosition: false, exists: false });
			}
			lines.push(line);
		}
		return lines;
	}

	function searchWords() {
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

	function changeLetter(event, lineIndex, squareIndex) {
		setWordleLines((prevWordleLines) => {
			return prevWordleLines.map((line, line_i) => {
				return line_i != lineIndex
					? line
					: line.map((square, square_i) => {
							return square_i != squareIndex
								? square
								: { ...square, letter: event.target.value.toUpperCase() };
					  });
			});
		});
	}

	function changeLetterVal(event, lineIndex, squareIndex) {
		setWordleLines((prevWordleLines) => {
			return prevWordleLines.map((line, line_i) => {
				return line_i != lineIndex
					? line
					: line.map((square, square_i) => {
							if (square_i != squareIndex) {
								return square;
							} else {
								if (!square.correctPosition && !square.exists) {
									return {
										...square,
										correctPosition: false,
										exists: true,
									};
								} else if (!square.correctPosition && square.exists) {
									return {
										...square,
										correctPosition: true,
										exists: true,
									};
								} else {
									return {
										...square,
										correctPosition: false,
										exists: false,
									};
								}
							}
					  });
			});
		});
	}

	const linesEl = wordleLines.map((line, index) => {
		return (
			<WordleLine
				key={`line_${index}`}
				lineIndex={index}
				changeLetter={changeLetter}
				changeLetterVal={changeLetterVal}
				wordleLines={wordleLines}
			/>
		);
	});

	function contentEl() {
		console.log(incompleteLine);
		if (incompleteLine) {
			return "* É preciso completar no mínimo a primeira linha.";
		} else if (possibleWords.length > 0) {
			return possibleWords.join(", ") + ".";
		} else {
			return (
				<>
					Nenhuma palavra encontrada.
					<br />
					<br />
					Verifique se não há contradições na tabela ou se você está usando acentos.
				</>
			);
		}
	}

	function resetTable() {
		setRenderWords(false);
		setWordleLines((prev) => (prev = feedLines()));
		console.log(wordleLines);
	}

	// useEffect(() => {}, [possibleWords, wordleLines]);

	return (
		<>
			<section className="game-table">
				<div className="container game-container">{linesEl}</div>
				<div className="action-btns-container">
					<button className="search-btn" onClick={searchWords}>
						Buscar
					</button>
					<button className="reset-btn" onClick={resetTable}>
						<img src={resetIcon} alt="reset" />
					</button>
				</div>
			</section>
			{renderWords && (
				<section className="possible-words container">
					<p className="possible-words-content">{contentEl()}</p>
				</section>
			)}
		</>
	);
}
