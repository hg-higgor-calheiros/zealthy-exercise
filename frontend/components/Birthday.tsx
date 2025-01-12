'use client'

import { useOnboarding } from "@/contexts/OnboardingContext"
import { DatePickerComponent } from "./inputs/DatePicker"

export default function BirthdayForm () {
    const { birthday, setBirthday } = useOnboarding()
    
    return (
        <div className="flex flex-col p-6">
            <DatePickerComponent onChange={setBirthday} currentDate={birthday} label="Select your birth date"/>
        </div>
    )
}
