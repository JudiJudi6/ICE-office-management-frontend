"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

interface InputProps {
  label?: string;
  setValue: Dispatch<SetStateAction<string | number>>;
  placeholder: string;
  type: "text" | "email" | "number" | "password";
  id: string;
}

export default function Input({
  placeholder,
  setValue,
  type,
  id,
  label,
}: InputProps) {
  const [inputValue, setInputValue] = useState<string | number>("");

  function changeValue(val: string | number) {
    setInputValue(val);
    setValue(val);
  }

  return (
    <div>
      {label && (
        <div>
          <label htmlFor={id}>{label}</label>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => changeValue(e.target.value)}
      />
    </div>
  );
}
