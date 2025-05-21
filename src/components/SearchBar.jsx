const SearchBar = ({ searchTerm, setSearchTerm }) => {
	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};
	return (
		<div className="search-bar">
			<input
				type="text"
				placeholder="Buscar por id o descripción"
				className="search-input"
				value={searchTerm}
				onChange={handleInputChange}
			/>
			{searchTerm && (
				<button
					className="btn-clear"
					type="button"
					onClick={() => setSearchTerm("")}
				>
					✖
				</button>
			)}
		</div>
	);
};

export default SearchBar;