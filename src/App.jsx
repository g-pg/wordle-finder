import React, { useState } from "react";
import { Header } from "./components/Header";
import Guide from "./components/Guide";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	const [guideOpen, setGuideOpen] = useState(true);

	function openGuide() {
		setGuideOpen((open) => !open);
	}

	return (
		<>
			<BrowserRouter>
				<Header openGuide={openGuide} />

				<Guide isOpen={guideOpen} toggleOpen={openGuide} />

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sobre" element={<About />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
