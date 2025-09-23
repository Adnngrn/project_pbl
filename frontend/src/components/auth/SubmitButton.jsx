import React from 'react';

const SubmitButton = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full border border-amber-600 bg-amber-600 text-white py-2 rounded-xl hover:text-amber-700 hover:bg-white transition"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
