import "./style.css";

export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Buscar por descripción o ID"
      onChange={(e) => onSearch(e.target.value)}
      className="barra-busqueda"
    />
  );
}
