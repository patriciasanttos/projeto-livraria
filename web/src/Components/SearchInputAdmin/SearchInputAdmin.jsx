import "./SearchInputAdmin.scss";

function SearchInputAdmin({ title, placeholder, className, name, onChange, value, ...props }) {
  return (
    <section className="search-input-admin-container">
      <h3>{title}</h3>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
        {...props}
      />
    </section>
  );
}

export default SearchInputAdmin;
