interface AppButtonProps {
    label: string,
    disabled: boolean, 
    onClick: () => void
}

export default function AppButton ({ label, onClick, disabled }: AppButtonProps) {
    return (
        <button 
            className={`
                px-6 py-2 rounded-md text-white 
                ${disabled ? 'bg-zinc-500' : 'bg-blue-500 hover:bg-blue-700' }
            `} 
            onClick={onClick} 
            disabled={disabled}>
                {label}
        </button>
    )
}