//import { useState, useEffect } from "react";
import "./index.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

function App() {
	return (
		<>
			<div>
				<h1>Gestor de Productos</h1>
				<div>
					<ProductForm />
					<SearchBar />
					<ProductList />
				</div>
			</div>
		</>
	);
}

export default App;
