import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import Guide from "./components/Guide";
import WordleTable from "./components/WordleTable";

function App() {
	return (
		<>
			<Header />
			<WordleTable />
			<Guide />
		</>
	);
}

export default App;
