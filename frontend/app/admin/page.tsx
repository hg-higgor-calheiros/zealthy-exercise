'use client'

import { useAdmin } from "@/contexts/AdminContext"
import { ComponentTypes } from "@/contexts/OnboardingContext"
import CheckBoxItem from "@/components/inputs/CheckBox"
import { Key, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AppButton from "@/components/Buttons"

const ALLOWED_COMPONENTS: ComponentTypes[] = [
    'about_me',
    'birthday',
    'address_form',
    'sign_up'
]

export default function AdminPage() {
    const { getSteps, updateSteps } = useAdmin()
    const router = useRouter()

    const [secondStepComponents, setSecondStepComponents] = useState<ComponentTypes[]>([])
    const [thirdStepComponents, setThirdStepComponents] = useState<ComponentTypes[]>([])

    useEffect(() => {
        async function fetch () {
            const [second, third] = await getSteps()
            if (second) setSecondStepComponents(second.components)
            if (third) setThirdStepComponents(third.components)
        }

        fetch()
    }, [getSteps])

    const handleSelect = (value: ComponentTypes, step: number) => {
        if (step === 2) {
            if (secondStepComponents.includes(value)) {
                setSecondStepComponents(
                    secondStepComponents.filter((secondStepComponents) => secondStepComponents !== value)
                )
            } else {
                setSecondStepComponents([...secondStepComponents, value])
                setThirdStepComponents(
                    thirdStepComponents.filter((thirdStepComponents) => thirdStepComponents !== value)
                )
            }
        } else {
            if (thirdStepComponents.includes(value)) {
                setThirdStepComponents(
                    thirdStepComponents.filter((thirdStepComponents) => thirdStepComponents !== value)
                )
            } else {
                setThirdStepComponents([...thirdStepComponents, value])
                setSecondStepComponents(
                    secondStepComponents.filter((secondStepComponents) => secondStepComponents !== value)
                )
            }
        }
    }

    const disableButton = () => secondStepComponents.length === 0 || thirdStepComponents.length === 0

    const handleSubmit = async () => {
        await updateSteps('1', secondStepComponents)
        await updateSteps('2', thirdStepComponents)

        router.push('/data')
    }

    return (
        <div>
            <div>Admin Page</div>

            <div className="flex gap-6">
                <div className="bg-white p-4 flex-1 rounded-2xl border flex flex-col justify-between items-stretch">
                    <h1 className="text-2xl mb-6">Step 2 Components</h1>
                    <p>Current components:</p>

                    <div className="flex flex-col">
                        {
                            ALLOWED_COMPONENTS.map((component: ComponentTypes, idx: Key | null | undefined) => (
                                <CheckBoxItem 
                                    checked={secondStepComponents.includes(component)} 
                                    value={component} 
                                    key={idx} 
                                    name={component} 
                                    label={component} 
                                    setValue={(value) => handleSelect(value, 2)}
                                />
                            ))
                        }
                    </div>
                
                </div>

                <div className="bg-white p-4 flex-1 rounded-2xl border flex flex-col justify-between items-stretch">
                    <h1 className="text-2xl mb-6">Step 3 Components</h1>
                    <p>Current components:</p>

                    <div className="flex flex-col">
                        {
                            ALLOWED_COMPONENTS.map((component: ComponentTypes, idx: Key | null | undefined) => (
                                <CheckBoxItem 
                                    checked={thirdStepComponents.includes(component)} 
                                    value={component} 
                                    key={idx} 
                                    name={component} 
                                    label={component} 
                                    setValue={(value) => handleSelect(value, 3)}
                                />
                            ))
                        }
                    </div>
                
                </div>
            </div>

            <div className="flex flex-1 justify-end items-center mt-5">
                <AppButton label="Save" disabled={disableButton()} onClick={handleSubmit}/>
                {/* <button 
                    className={`
                        px-6 py-2 rounded-md text-white 
                        ${ disableButton() ? 'bg-zinc-500' : 'bg-blue-500 hover:bg-blue-700' }
                    `} 
                    onClick={handleSubmit} 
                    disabled={disableButton()}>
                        Save
                </button> */}
            </div>
        </div>
    )
}