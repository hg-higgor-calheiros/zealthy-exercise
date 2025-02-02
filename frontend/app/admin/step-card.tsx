import { Key, useEffect, useState } from "react";
import CheckBoxItem from "@/components/ui/inputs/CheckBox";
import { Step, ComponentTypes } from "@/contexts/OnboardingContext";

export interface ComponentConfig {
    name: ComponentTypes, 
    description: string
}

interface StepConfigProps {
    step: Step
    error: boolean
    selectedComponents: ComponentTypes[]
    componentList: ComponentConfig[]
    onDelete: (id?: number) => void
    onChange: (data: Omit<Step, 'components'>) => void
    onSelect: (id: number, component: ComponentTypes) => void
}

export default function StepCard({ step, error, selectedComponents, componentList, onDelete, onChange, onSelect }: StepConfigProps) {
    const [title, setTitle] = useState(step?.title || '')
    const [path, setPath] = useState(step?.path || '')

    useEffect(() => {
        onChange({
            id: step?.id,
            title, 
            path
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, title, path])

    return (
        <div className={`flex flex-col bg-white p-8 rounded-2xl border gap-8 ${error && 'border-red-600'}`}>

            <div className="flex flex-col justify-between w-full">
                <input className="text-2xl" placeholder={step?.title || 'Add step title'} onChange={(e) => setTitle(e.target.value)}/>
                <input className="mb-6" placeholder={step?.path || 'Add step path'} onChange={(e) => setPath(e.target.value)}/>
            </div>

            <div className="flex flex-col">
                {
                    componentList.map((component: ComponentConfig, idx: Key | null | undefined) => (
                        <CheckBoxItem
                            key={idx}
                            checked={selectedComponents.includes(component.name)}
                            description={component.description}
                            value={component.name}
                            name={component.name}
                            label={component.name}
                            onCheck={(value) => onSelect(step.id, value)}
                        />
                    ))
                }
            </div>

            <div className="flex justify-end gap-8">
                <button className="text-zinc-500 hover:text-zinc-800" onClick={() => onDelete(step?.id)}>Remove</button>

            </div>

        </div>
    )
}