"use client";

const CheckboxColor = ({
  color,
  name,
  type = "checkbox",
  onChange,
  valueName,
}) => {
  const onSelect = (e) => {
    const dataName = e.target.getAttribute("data-name");
    if (onChange && dataName) {
      onChange(dataName);
    }
  };

  const safeId = `${name}-${color}`;

  return (
    <label htmlFor={safeId} className="checkbox-color">
      <input
        onChange={onSelect}
        value={color}
        data-name={valueName}
        name={name}
        type={type}
        id={safeId}
      />
      <span className="checkbox__check">
        <span
          className="checkbox__color"
          style={{ backgroundColor: color }}
        />
      </span>
    </label>
  );
};

export default CheckboxColor;