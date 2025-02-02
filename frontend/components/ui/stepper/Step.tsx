import { Dot } from "./Dot"
import { StepTitle } from "./StepTitle"

interface StepProps {
    path: string
    title: string
    active?: boolean
}

export default function Step ({ title, active = false}: StepProps) {
    return (
        <div>
            <div className="flex items-center gap-4">
                <Dot active={active} />
                <StepTitle active={active} title={title} />
            </div>
        </div>
    )
}