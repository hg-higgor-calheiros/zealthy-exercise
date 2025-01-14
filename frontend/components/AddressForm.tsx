'use client'

import { useOnboarding } from "@/contexts/OnboardingContext";
import { TextInput } from "./inputs/TextInput";

export const states = [
    { label: "Alaska", value: "Alaska" },
    { label: "Alabama", value: "Alabama" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "Arizona", value: "Arizona" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "District of Columbia", value: "District of Columbia" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Iowa", value: "Iowa" },
    { label: "Idaho", value: "Idaho" },
    { label: "IL", value: "Illinois" },
    { label: "Illinois", value: "Indiana" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Maryland", value: "Maryland" },
    { label: "Maine", value: "Maine" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Missouri", value: "Missouri" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Montana", value: "Montana" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "Nevada", value: "Nevada" },
    { label: "New York", value: "NewYork" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Virginia", value: "Virginia" },
    { label: "Vermont", value: "Vermont" },
    { label: "Washington", value: "Washington" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wyoming", value: "Wyoming" },
  ];

export default function AddressForm () {
    const { setAddressFirstLine, setAddressSecondLine, setAddressState } = useOnboarding()

    return (
        <div className="flex flex-col p-6 gap-4">
            <h1 className="font-bold text-2xl text-zinc-800">Insert your address below</h1>
            
            <TextInput placeholder="Street name" onChange={setAddressFirstLine} />
            <TextInput placeholder="City" onChange={setAddressSecondLine} />

            <div className="my-3 w-1/2">
                <select name="states" onChange={(evt) => setAddressState(evt.target.value)} className="bg-transparent border-2 rounded-lg p-3 placeholder:text-base w-full">
                    {states.map((state, idx) => (
                        <option key={idx} value={state.value}>{state.label}</option>
                    ))}
                </select>
            </div>

        </div>
    )
}