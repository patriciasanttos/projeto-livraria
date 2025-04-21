import Select from "react-select";
import "./DropdownAdmin.scss";

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
  const selectOptions = options.map((optionItem) => ({
    value: optionItem.id,
    label: optionItem.name,
  }));

  const onChangeMultiple = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: selectedOptions.map((option) => ({
          id: option.value,
          name: option.label,
        })),
      },
    });

    onChange({
      target: {
        name: 'mainCategory',
        value: selectedOptions && selectedOptions.length > 0 ? selectedOptions[0].value : '',
      },
    });  
  };
  return multiple ? (
    <Select
      className="dropdown-multiple-admin"
      title={title}
      value={value.map((optionItem) => ({
        value: optionItem.id,
        label: optionItem.name,
      }))}
      onChange={onChangeMultiple}
      placeholder={placeholder}
      name={name}
      closeMenuOnSelect={false}
      isMulti
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          border: `1px solid #6BA57D`,
          marginTop: "10px",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          textAlign: "left",
          fontWeight: 400,
        }),
      }}
      options={selectOptions}
    />
  ) : (
    <section defaultValue={defaultValue} className="dropdown-admin-container">
      <h3>{title}</h3>
      <select name={name} onChange={onChange} value={value} {...props}>
        {options?.map((optionItem, index) => (
          <option key={index} value={optionItem.id}>
            {optionItem.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default DropdownAdmin;