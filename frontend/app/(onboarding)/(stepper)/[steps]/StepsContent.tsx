'use client'

import { useEffect, useMemo, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import RenderComponents from "@/app/utils/render"
import Spinner from "@/components/ui/Spinner"
import { Navigation } from "@/components/ui/stepper/Navigation"
import { StepsLayout } from "@/components/ui/stepper/StepsLayout"
import { Step, useOnboarding } from "@/contexts/OnboardingContext"

export default function StepsContent() {
    const router = useRouter()
    const pathname = usePathname()
    const { steps, aboutMe, birthday, address, submitData } = useOnboarding()

    const [currentStep, setCurrentStep] =  useState<Step>({ id: 0, title: '', path: '', components: [] } as Step)
    const [previousStepPath, setPreviousStepPath] = useState('/credentials')
    const [nextStepPath, setNextStepPath] = useState<string>()

    useEffect(() => {
        const currentStepIndex = steps.findIndex(step => step.path === pathname)
        if (currentStepIndex !== -1) setCurrentStep(steps[currentStepIndex])

        const nextStep = steps[currentStepIndex + 1]
        if (nextStep) setNextStepPath(nextStep.path)

        const prevStep = steps[currentStepIndex - 1]
        if (prevStep) setPreviousStepPath(prevStep.path)
    }, [pathname, steps])

    // Very simple validation - possible to add more complex validations if needed
    const isStepValidated = useMemo(() => {
        return currentStep.components.every(component => {
            if(component === 'about_me' && aboutMe && aboutMe.trim().length > 0) return true
            if(component === 'address_form' && address && address.trim().length > 0) return true
            if(component === 'birthday' && birthday) return true
            return false
        })
    }, [aboutMe, address, birthday, currentStep])

    const handleSubmit = async () => {
        await submitData()
        router.push('/success')
    }

    return (
        <StepsLayout title={currentStep.title}>
            { 
                currentStep.title ? 
                    RenderComponents({components: currentStep.components}) :
                    <Spinner />
            }
            <Navigation 
                back={previousStepPath}
                next={nextStepPath}
                stepIsValidated={isStepValidated}
                onSubmit={handleSubmit}
            />
        </StepsLayout>
    )
}
