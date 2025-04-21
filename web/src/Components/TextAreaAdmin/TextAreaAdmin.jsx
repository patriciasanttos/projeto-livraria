import "./TextAreaAdmin.scss";

function TextAreaAdmin({ title, placeholder, className, name, onChange, value, ...props }) {
  return (
    <section className="text-area-admin-container">
      <h3>{title}</h3>
      <textarea
        type="text"
        name={name}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        {...(value !== undefined ? { value } : { defaultValue: '' })}
        {...props}
      />
    </section>
  );
}

export default TextAreaAdmin;
