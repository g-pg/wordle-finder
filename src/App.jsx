import React, { useState } from "react";
import { Header } from "./components/Header";
import Guide from "./components/Guide";
import Home from "./components/Home";
import About from "./components/About";
import { Route, Routes } from "react-router-dom";

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
			<Header openGuide={openGuide} />

			<Guide isOpen={guideOpen} toggleOpen={openGuide} />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/sobre" element={<About />} />
			</Routes>
		</>
	);
}

export default App;
