'use client'

import AboutMe from "@/components/AboutMe"
import AddressForm from "@/components/AddressForm"
import BirthdayForm from "@/components/Birthday"
import { ComponentTypes } from "@/contexts/OnboardingContext"
import { JSX } from "react"

export interface RenderComponentsProps {
    components: ComponentTypes[]
}

export default function RenderComponents ({ components }: RenderComponentsProps) {
    const renderComponents = (components: string[]): (JSX.Element | undefined)[]  => {
        return components.map((component, idx) => {
            if (component === 'about_me') return <AboutMe key={idx}/> 
            if (component === 'birthday') return <BirthdayForm key={idx}/> 
            if (component === 'address_form') return <AddressForm key={idx}/> 
        })
    }

    return renderComponents(components)
    
}