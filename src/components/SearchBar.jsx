export default function SearchBar({
    searchTerm,
    onSearchChange,
    sortValue,
    onSortChange
}) {

    return (
        <div className="search-container">
            <div className="search-input">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={onSearchChange}
                />
            </div>

            <div className="sort-dropdown">
                <select
                    id="sort-type"
                    value={sortValue}
                    onChange={onSortChange}
                >
                    <option value="">Sort By</option>
                    <option value="release-date-asc">Release Date (Asc)</option>
                    <option value="release-date-desc">Release Date (Desc)</option>
                    <option value="rating-asc">Rating (Asc)</option>
                    <option value="rating-desc">Rating (Desc)</option>
                </select>
            </div>
        </div>
    );
}