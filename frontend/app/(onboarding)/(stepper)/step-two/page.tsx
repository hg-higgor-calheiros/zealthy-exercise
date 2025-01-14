'use client'

import RenderComponents from "@/app/utils/render";
import { Navigation } from "@/components/steps/Navigation";
import { StepsLayout } from "@/components/steps/StepsLayout";
import { Step, useOnboarding } from "@/contexts/OnboardingContext";
import { useEffect, useState } from "react";

export default function StepTwoPage () {
    const [components, setComponents] = useState<Step>({ title: '', components: [] } as Step)
    const { getConfig } = useOnboarding()

    useEffect(() => {
        async function getConfigParams() {
            try {
                const comps = await getConfig('second')
                if (comps) setComponents(comps)
              } catch (error) {
                  console.log(error)
              }
        }
        getConfigParams()
    }, [getConfig, setComponents])

    return (
        <StepsLayout title={'Personal informations'}>
            {RenderComponents({components: components.components})}
            <Navigation back="/" next="step-three" />
        </StepsLayout>
    )
}