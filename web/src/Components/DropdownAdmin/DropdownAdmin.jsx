import './DropdownAdmin.scss'

function DropdownAdmin({ children, title, ...props }) {
  return (
    <section className="dropdown-admin-container">
      <h3>{title}</h3>
      <select {...props}>{children}</select>
    </section>
  );
}

export default DropdownAdmin