import React, { useState, useEffect, useRef } from "react";

export default function WordleLine(props) {
	const [squaresArray, setSquaresArray] = useState([]);
	const inputRefs = useRef([]);

	useEffect(() => {
		let updatedSquaresArray = [];
		for (let i = 0; i < 5; i++) {
			let wordleBG;
			let square = props.wordleLines[props.lineIndex][i];
			if (square.letter) {
				if (!square.correctPosition && !square.exists) {
					wordleBG = "bg-grey";
				} else if (!square.correctPosition && square.exists) {
					wordleBG = "bg-yellow";
				} else if (square.correctPosition && square.exists) {
					wordleBG = "bg-green";
				}
			}
			const ref = React.createRef();
			inputRefs.current[i] = ref;
			updatedSquaresArray.push(
				<input
					type="text"
					maxLength="1"
					className={`wordle-square ${wordleBG}`}
					key={`square_${i}`}
					ref={ref}
					value={props.wordleLines[props.lineIndex][i].letter}
					onInput={(event) => {
						if (event.target.value.length === 1) {
							event.target.value = event.target.value[0];
						}
					}}
					onChange={(event) => {
						event.persist();
						props.changeLetter(event, props.lineIndex, i);
					}}
					onKeyDown={(event) => {
						if (
							inputRefs.current[i + 1] &&
							event.target.value != "" &&
							event.key != "Backspace"
						) {
							inputRefs.current[i + 1].current.focus();
						} else if (
							inputRefs.current[i - 1] &&
							event.key === "Backspace" &&
							event.target.value === ""
						) {
							inputRefs.current[i - 1].current.focus();
						}
					}}
					onClick={(event) => {
						event.preventDefault();
						event.stopPropagation();
						event.persist();
						square.letter ? props.changeLetterVal(event, props.lineIndex, i) : "";
					}}
				/>
			);
		}
		setSquaresArray(updatedSquaresArray);
	}, [props.wordleLines, props.lineIndex]);

	return <div className="wordle-line">{squaresArray}</div>;
}
