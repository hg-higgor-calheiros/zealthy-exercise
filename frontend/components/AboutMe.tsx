'use client'

import { useOnboarding } from "@/contexts/OnboardingContext";
import { TextArea } from "./ui/inputs/TextArea";

export default function AboutMe () {
    const { setAboutMe } = useOnboarding()

    return (
        <div className="flex flex-col p-6">
            <h1 className="font-bold text-2xl text-zinc-800">We want to know you better!</h1>
            <TextArea label="Can you tell us a little about yourself?" onChange={setAboutMe} />
        </div>
    )
}