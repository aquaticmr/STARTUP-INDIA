const SearchForm = ({ query }: { query?: string }) => {
  return (
    <form action="/" className="search-form">
      <input
        name="query"
        defaultValue={query || ""}
        className="search-input"
        placeholder="Search Startups..."
      />
      <button type="submit" className="search-btn">
        S
      </button>
    </form>
  );
};

export default SearchForm;