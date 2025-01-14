'use client'

import { useOnboarding } from "@/contexts/OnboardingContext"
import { DatePickerComponent } from "./inputs/DatePicker"

export default function BirthdayForm () {
    const { birthday, setBirthday } = useOnboarding()
    
    return (
        <div className="w-full flex flex-col gap-4 items-start justify-center m-6">
            <h1 className="font-bold text-2xl text-zinc-800">{"What's your date of birth?"}</h1>

            <DatePickerComponent 
                placeholder="Pick a date here"
                onChange={setBirthday} 
                currentDate={birthday} 
            />
        </div>
    )
}
