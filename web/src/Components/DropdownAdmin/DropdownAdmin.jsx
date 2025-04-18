import "./DropdownAdmin.scss";
import Select from "react-select";

function DropdownAdmin({
  title,
  multiple,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  name,
  ...props
}) {
  const onChangeMultiple = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: selectedOptions.map((item) => item.value),
      },
    });
  };
  return multiple ? (
    <Select
      className="dropdown-multiple-admin"
      onChange={onChangeMultiple}
      closeMenuOnSelect={false}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: `1px solid #6BA57D`,
          marginTop: "10px"
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          textAlign: "left",
          fontWeight: 400
        }),
      }}
      isMulti
      placeholder={placeholder}
      options={options.map((optionItem) => ({
        value: optionItem.value,
        label: optionItem.text,
      }))}
    />
  ) : (
    <section defaultValue={defaultValue} className="dropdown-admin-container">
      <h3>{title}</h3>
      <select name={name} onChange={onChange} value={value} {...props}>
        {options?.map((optionItem, index) => (
          <option key={index} value={optionItem.value}>
            {optionItem.text}
          </option>
        ))}
      </select>
    </section>
  );
}

export default DropdownAdmin;
