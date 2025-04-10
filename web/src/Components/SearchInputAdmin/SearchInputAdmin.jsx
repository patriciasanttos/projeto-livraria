import "./SearchInputAdmin.scss";

function SearchInputAdmin({ title, placeholder, className, onChange, value }) {
  return (
    <section className="search-input-admin-container">
      <h3>{title}</h3>
      <input
        type="text"
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
      />
    </section>
  );
}

export default SearchInputAdmin;
