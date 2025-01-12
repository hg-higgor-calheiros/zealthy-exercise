'use client'

import { useEffect, useState } from "react";
import RenderComponents from "@/app/utils/render";
import { StepsLayout } from "@/components/steps/StepsLayout";
import { Step, useOnboarding } from "@/contexts/OnboardingContext";
import { Navigation } from "@/components/steps/Navigation";
import { useRouter } from "next/navigation";

export default function StepOnePage () {
    const { submitData, getConfig } = useOnboarding()
    const router = useRouter()
    
     const [components, setComponents] = useState<Step>({ title: '', components: [] } as Step)
 
     useEffect(() => {
         async function getConfigParams() {
             try {
                 const comps = await getConfig('third')
                 if (comps) setComponents(comps)
               } catch (error) {
                   console.log(error)
               }
         }
 
         getConfigParams()
     }, [getConfig, setComponents])

     const handleSubmit = async () => {
        await submitData()
        router.push('/data')
     }
 

    return (
        <StepsLayout title={components?.title} >
            {RenderComponents({components: components?.components})}
            <Navigation back="/step-two" onSubmit={handleSubmit} /> 
        </StepsLayout>
    )
}