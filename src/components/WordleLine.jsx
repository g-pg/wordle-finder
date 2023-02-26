import React, { useEffect, useState, useRef, memo, useMemo } from "react";
import Square from "./Square";

export default function WordleLine(props) {
	const inputRefs = useRef([]);

	const squares = useMemo(() => {
		return props.wordleLines[0].map((line, i) => {
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
	}, [props.wordleLines]);
	return <div className="wordle-line">{squares}</div>;
}
