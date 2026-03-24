"use client";

const Checkbox = ({ type = "", label, name, onChange }) => {
  const safeId = `${name}-${label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <label
      htmlFor={safeId}
      className={`checkbox ${type ? `checkbox--${type}` : ""}`}
    >
      <input
        name={name}
        onChange={onChange}
        type="checkbox"
        id={safeId}
      />
      <span className="checkbox__check" />
      <p>{label}</p>
    </label>
  );
};

export default Checkbox;