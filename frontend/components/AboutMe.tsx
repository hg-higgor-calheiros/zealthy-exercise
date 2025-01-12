'use client'

import { useOnboarding } from "@/contexts/OnboardingContext";
import { TextArea } from "./inputs/TextArea";

export default function AboutMe () {
    const { setAboutMe } = useOnboarding()

    return (
        <div className="flex flex-col p-6">
            <TextArea label="Tell us about yourself" onChange={setAboutMe} />
        </div>
    )
}