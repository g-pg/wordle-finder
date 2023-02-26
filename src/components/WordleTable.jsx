import React, { useState } from "react";
import WordleLine from "./WordleLine";
import resetIcon from "../assets/img/reset-icon.svg";

function WordleTable({ searchWords, resetTable }) {
	const [wordleLines, setWordleLines] = useState(() => feedLines());

	function handleReset(event) {
		event.preventDefault();
		resetTable();
		setWordleLines(feedLines());
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

	function changeLetter(event, lineIndex, squareIndex) {
		setWordleLines((prevWordleLines) => {
			return prevWordleLines.map((line, line_i) => {
				return line_i != lineIndex
					? line
					: line.map((square, square_i) => {
							return square_i != squareIndex
								? square
								: event.target.value === ""
								? { letter: "", correctPosition: false, exists: false }
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

	return (
		<>
			<form onSubmit={(event) => searchWords(wordleLines, event)}>
				<section className="game-table">
					<div className="container game-container">{linesEl}</div>
					<div className="action-btns-container">
						<button
							className="search-btn"
							onClick={(event) => searchWords(wordleLines, event)}
							type="submit"
						>
							Buscar
						</button>
						<button type="btn" className="reset-btn" onClick={handleReset}>
							<img src={resetIcon} alt="reset" />
						</button>
					</div>
				</section>
			</form>
		</>
	);
}

export default WordleTable;
