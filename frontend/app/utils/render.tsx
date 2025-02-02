'use client'

import AboutMe from "@/components/AboutMe"
import AddressForm from "@/components/AddressForm"
import BirthdayForm from "@/components/Birthday"
import SignUp from "@/components/auth/SignUp"
import { ComponentTypes } from "@/contexts/OnboardingContext"
import { JSX } from "react"

export interface RenderComponentsProps {
    components: ComponentTypes[]
    error?: string
    onChangeEmail?: (value: string) => void
    onChangePassword?: (value: string) => void
}

export default function RenderComponents ({ components, error, onChangeEmail, onChangePassword }: RenderComponentsProps) {
    const renderComponents = (components: string[]): (JSX.Element | undefined)[]  => {
        return components.map((component, idx) => {
            if (component === 'about_me') return <AboutMe key={idx}/> 
            if (component === 'birthday') return <BirthdayForm key={idx}/> 
            if (component === 'address_form') return <AddressForm key={idx}/> 
            if (component === 'sign_up' && onChangeEmail && onChangePassword) return <SignUp key={idx} error={error} onChangeEmail={onChangeEmail} onChangePassword={onChangePassword}/> 
        })
    }

    return renderComponents(components)
    
}