import React, { memo } from "react";
import classNames from "classnames";

const wordleBG = classNames({
	"bg-green": props.square.correctPosition && props.square.exists,
	"bg-yellow": !props.square.correctPosition && props.square.exists,
	"bg-grey": !props.square.correctPosition && !props.square.exists,
});

function Square(props) {
	function handleChange(event) {
		props.onChange(event, props.lineIndex, props.index);
	}

	function handleKeyUp(event) {
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
	}

	function handleClick(event) {
		event.preventDefault();
		event.stopPropagation();
		event.persist();
		props.square.letter ? props.onClick(event, props.lineIndex, props.index) : "";
	}

	return (
		<input
			type="text"
			maxLength="1"
			className={`wordle-square ${props.square.letter ? wordleBG : ""}`}
			key={`square_${props.index}`}
			ref={props.refProp}
			value={props.square.letter}
			onChange={handleChange}
			onKeyUp={handleKeyUp}
			onClick={handleClick}
		/>
	);
}

export default memo(Square);
