import { ComponentTypes } from "@/contexts/OnboardingContext"

interface CheckBoxItemProps {
    name: string
    description: string
    label: string
    checked: boolean
    value: ComponentTypes
    onCheck: (value: ComponentTypes) => void
}
export default function CheckBoxItem ({ name, description, checked, value, label, onCheck }: CheckBoxItemProps) {
    return (
        <span className={`flex items-center gap-4 border px-4 py-2 mb-2 rounded-lg hover:cursor-pointer ${checked && 'border-blue-800'}`} onClick={() => onCheck(value)}>
            <input
                type="checkbox"
                className="w-4 h-4"
                name={name}
                checked={checked}
                onChange={() => onCheck(value)}
            />
            <div className="flex flex-col justify-start">
                <label className="text-xl font-semibold text-left">{label}</label>            
                <p className="text-zinc-500 font-sm">{description}</p>            
            </div>
        </span>
    )
}
