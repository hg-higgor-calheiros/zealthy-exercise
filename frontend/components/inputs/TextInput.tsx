type TextInputProps = {
    label?: string
    onChange: (value: string) => void,
    type?: string
    placeholder?: string
};

export const TextInput = ({ label, onChange, placeholder, type }: TextInputProps) => {
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
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-2 rounded-lg p-2 text-[18px] lg:text-[22px] placeholder:text-base"
      />
    </>
  );
};