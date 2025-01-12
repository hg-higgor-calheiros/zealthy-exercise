import { ComponentTypes } from "@/contexts/OnboardingContext"

interface CheckBoxItemProps {
    name: string,
    label: string,
    checked: boolean,
    value: ComponentTypes,
    setValue: (value: ComponentTypes) => void
}
export default function CheckBoxItem ({ name, checked, value, label, setValue }: CheckBoxItemProps) {
    return (
        <label className="flex items-center justify-start w-full gap-2">
        <input
            type="checkbox"
            className="h-[20px] border border-blue-400"
            name={name}
            checked={checked}
            onChange={() => setValue(value)}
        />
            {label}
        </label>
    )
}
