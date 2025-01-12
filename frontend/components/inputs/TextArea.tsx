type TextAreaProps = {
    label: string
    onChange: (value: string) => void,
    type?: string
    placeholder?: string
};

export const TextArea= ({ label, onChange, placeholder }: TextAreaProps) => {
  return (
    <>
      <label
        htmlFor="text"
        className="mb-4"
      >
        {label}
      </label>
      <textarea
        name="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-2 rounded-lg p-2 text-[18px] min-h-[100px] max-h-[250px] max-w-[350px] lg:max-w-[500px]"
      />
    </>
  );
};