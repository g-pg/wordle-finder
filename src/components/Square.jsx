import React, { memo, useMemo, useEffect } from "react";

function Square(props) {
	const square = props.square;

	const wordleBG = useMemo(() => {
		return getWordleBG();
	}, [square]);

	function getWordleBG() {
		if (square.letter) {
			if (!square.correctPosition && !square.exists) {
				return "bg-grey";
			} else if (!square.correctPosition && square.exists) {
				return "bg-yellow";
			} else if (square.correctPosition && square.exists) {
				return "bg-green";
			}
		}
	}

	return (
		<input
			type="text"
			maxLength="1"
			className={`wordle-square ${wordleBG}`}
			key={`square_${props.index}`}
			ref={props.refProp}
			// value={square.letter}
			onInput={(event) => {
				event.persist();
				let letterInput = event.target.value.toUpperCase();
				if (letterInput.length > 1) {
					event.target.value = letterInput[letterInput.length - 1];
				}
				if (!letterInput.match(/[A-Z]/g)) {
					event.target.value = "";
				}
			}}
			onChange={(event) => {
				event.persist();
				props.onChange(event, props.lineIndex, props.index);
			}}
			onKeyDown={(event) => {
				if (
					props.inputRefs.current[props.index + 1] &&
					event.target.value !== "" &&
					event.key !== "Backspace"
				) {
					props.inputRefs.current[props.index + 1].current.focus();
				} else if (
					props.inputRefs.current[props.index - 1] &&
					event.key === "Backspace" &&
					event.target.value === ""
				) {
					props.inputRefs.current[props.index - 1].current.focus();
				}
			}}
			onClick={(event) => {
				event.preventDefault();
				event.stopPropagation();
				event.persist();
				square.letter ? props.onClick(event, props.lineIndex, props.index) : "";
			}}
		/>
	);
}

export default memo(Square);
