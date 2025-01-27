import React from 'react';

interface SelectProps {
  name: string;
  options: { value: string; label: string }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  className: string;
}

const Select: React.FC<SelectProps> = ({ name, className, options, onChange, value }) => {
  return (
    <select
      name={name}
      className={className}
      value={value}
      onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
