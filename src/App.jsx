import React, { useState } from "react";
import { Header } from "./components/Header";
import Guide from "./components/Guide";
import Home from "./components/Home";
import About from "./components/About";
function App() {
	const [guideOpen, setGuideOpen] = useState(true);
	const [page, setPage] = useState("home");

	function openGuide() {
		setGuideOpen((open) => !open);
	}
	function changePage(page) {
		page === "home" ? setPage("home") : setPage("about");
	}
	return (
		<>
			<Header openGuide={openGuide} changePage={changePage} />
			{page === "home" && <Home />}
			<Guide isOpen={guideOpen} toggleOpen={openGuide} />
			{page === "about" && <About />}
		</>
	);
}

export default App;
