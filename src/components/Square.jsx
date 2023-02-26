function Square(props) {
	const styles = { background: "none" };

	if (props.square.letter) {
		if (props.square.correctPosition && props.square.exists) {
			styles.background = "var(--green)";
		} else if (!props.square.correctPosition && props.square.exists) {
			styles.background = "var(--yellow)";
		} else if (!props.square.correctPosition && !props.square.exists) {
			styles.background = "var(--grey)";
		}
	}

	function handleChange(event) {
		if (!event.target.value.match(/[A-Z]/i) && event.target.value != "") {
			event.target.value = "";
		} else {
			props.onChange(event, props.lineIndex, props.index);
		}
		console.log(props.square.letter);
	}

	function handleKeyDown(event) {
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
			className="wordle-square"
			style={styles}
			key={`square_${props.index}`}
			ref={props.refProp}
			value={props.square.letter}
			onChange={handleChange}
			onKeyUp={handleKeyDown}
			onClick={handleClick}
		/>
	);
}

export default Square;
