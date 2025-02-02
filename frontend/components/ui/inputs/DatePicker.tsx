'use client'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
    placeholder: string,
    currentDate: Date | undefined,
    onChange: (value: Date | null) => void,
};

export const DatePickerComponent = ({ placeholder, currentDate, onChange }: DatePickerProps) => {
  return (
      <DatePicker
        className="border h-12 rounded-lg p-2 flex items-center justify-center"
        locale="en"
        withPortal
        placeholderText={placeholder}
        selected={currentDate}
        onChange={onChange}
      />
  );
};