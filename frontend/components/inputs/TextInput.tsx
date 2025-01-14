type TextInputProps = {
    label?: string
    onChange: (value: string) => void,
    onBlur?: () => void,
    required?: boolean,
    type?: string
    placeholder?: string
};

export const TextInput = ({ label, onChange, onBlur, required, placeholder, type }: TextInputProps) => {
  return (
    <>
      <label
        htmlFor="text"

      >
        {label}
      </label>
      <input
        type={type ? type : "text"}
        name="text"
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className="bg-transparent border-2 rounded-lg p-2 text-[18px] lg:text-[22px] placeholder:text-base"
      />
    </>
  );
};