import Link from "next/link"
import { Dot } from "./Dot"
import { StepTitle } from "./StepTitle"

interface StepProps {
    path: string
    title: string
    active?: boolean
}

export default function Step ({ path, title, active = false}: StepProps) {
    return (
        <Link href={path}>
            <div className="flex items-center gap-4">
            <Dot active={active} />
            <StepTitle active={active} title={title} />
            </div>
        </Link>
    )
}