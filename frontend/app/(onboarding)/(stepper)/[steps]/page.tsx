import StepsContent from './StepsContent'

export function generateStaticParams() {
    return [
        { steps: 'about' },
        { steps: 'birthday' },
        { steps: 'address' }
    ]
}

export default function Page() {
    return <StepsContent />
}