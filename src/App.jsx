import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import Guide from "./components/Guide";
import WordleTable from "./components/WordleTable";

function App() {
	const [guideOpen, setGuideOpen] = useState(true);

	function openGuide() {
		setGuideOpen((open) => !open);
	}

	return (
		<>
			<Header openGuide={openGuide} />
			<WordleTable />
			<Guide isOpen={guideOpen} toggleOpen={openGuide} />
		</>
	);
}

export default App;
