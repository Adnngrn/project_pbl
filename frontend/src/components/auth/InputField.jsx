import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, placeholder, ...rest }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full px-3 py-2 border border-amber-600 rounded focus:outline-none focus:ring focus:border-amber-600"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default InputField;
