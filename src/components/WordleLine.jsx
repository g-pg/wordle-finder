import React, { useRef } from "react";
import Square from "./Square";

function WordleLine(props) {
	const inputRefs = useRef([]);

	const squares = props.wordleLines[0].map((line, i) => {
		const ref = React.createRef();
		inputRefs.current[i] = ref;

		return (
			<Square
				key={`line${props.lineIndex}square_${i}`}
				index={i}
				lineIndex={props.lineIndex}
				square={props.wordleLines[props.lineIndex][i]}
				refProp={ref}
				inputRefs={inputRefs}
				onChange={props.changeLetter}
				onClick={props.changeLetterVal}
			/>
		);
	});

	return <div className="wordle-line">{squares}</div>;
}

export default WordleLine;
