const FilterForName = ({ filter, handleInputFilterChange, handleButtonCleanClick }) => {
    return (
        <div>
            filer: <input value={filter} onChange={handleInputFilterChange} />
            <button onClick={handleButtonCleanClick}>clean</button>
        </div>
    )
}

export default FilterForName