'use client'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DatePickerProps = {
    label: string,
    currentDate: Date | undefined,
    onChange: (value: Date | null) => void,
};

export const DatePickerComponent = ({ label, currentDate, onChange }: DatePickerProps) => {
  return (
    <div className="w-full max-w-xl flex flex-row gap-4 justify-center items-center">
      <label htmlFor="text">
        {label}
      </label>
      <DatePicker
        className="border h-12 rounded-lg p-2"
        locale="en"
        selected={currentDate}
        onChange={onChange}
      />
    </div>
  );
};