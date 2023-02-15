import { memo } from "react";

const PossibleWordsEl = memo(function PossibleWordsEl(props) {
	return `${props.possibleWords.join(", ")}.`;
});

export default PossibleWordsEl;
