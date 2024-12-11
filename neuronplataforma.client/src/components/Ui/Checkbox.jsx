import React from 'react';

const Checkbox = ({ id, checked, onChange, children }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
