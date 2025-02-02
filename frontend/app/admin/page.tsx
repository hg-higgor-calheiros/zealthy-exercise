'use client'

import { useEffect, useMemo, useRef, useState } from "react"
import { IoAddCircleSharp } from "react-icons/io5"

import { useAdmin } from "@/contexts/AdminContext"
import { ComponentTypes, Step } from "@/contexts/OnboardingContext"
import StepCard, { ComponentConfig } from "./step-card"
import Spinner from "@/components/ui/Spinner"
import AppButton from "@/components/ui/Buttons"

// Component names and descriptions could also be moved to the API
const ALLOWED_COMPONENTS: ComponentConfig[] = [
    { name: 'about_me', description: 'Component for getting info about the user ' },
    { name: 'birthday', description: 'Date picker for user birthday' },
    { name: 'address_form', description: 'Complete address form' },
]

export default function AdminPage() {
    const { steps, getSteps, createStep, updateSteps,  deleteStep } = useAdmin()
    const dialogRef = useRef<null | HTMLDialogElement>(null)
    
    const [addStep, setAddStep] = useState(true)
    const [loading, setLoading] = useState(false)
    const [tempSteps, setTempSteps] = useState<Step[]>([])
    const [stepsToUpdate, setStepsToUpdate] = useState<Step[]>([])
    const [stepToRemove, setStepToRemove] = useState<number | null>()

    
    useEffect(() => setTempSteps(steps), [steps])

    // Set the max steps to be Components length
    useEffect(() => {
        if (tempSteps.length === ALLOWED_COMPONENTS.length) {
            setAddStep(false)
        }
    }, [tempSteps])

    const onChange = (data: Omit<Step, 'components'>) => {
        prepareForUpdate(data.id, data)
    }

    const onSelect = (id: number, component: ComponentTypes) => {
        setTempSteps(steps => 
            steps.map(step => {
                if (step.id === id) {
                    if (step.components.includes(component)) {
                        step.components = step.components.filter(comp => comp !== component)
                    } else {    
                        step.components.push(component)
                    }
                } else if (step.components.includes(component)) {
                    step.components = step.components.filter(comp => comp !== component)
                }
                prepareForUpdate(step.id, { components: step.components })
                return step
            })
        )
    }

    const handleSave = async () => {
        for await (const step of stepsToUpdate) {
            if (step.id === 0) {
                await createNewStep(step)
            } else {
                await updateStep(step)
            }
        }

        await getSteps(true)
        setAddStep(true)
        setStepsToUpdate([])
        setTempSteps([])
    }

    const openConfirmationModal = () => dialogRef.current?.show()

    const closeConfirmationModal = () => {
        setStepToRemove(null)
        setAddStep(true)
        dialogRef.current?.close()
    }

    const isSaveDisabled = useMemo(() => {
        if (
            tempSteps.some(step => step.path && step.path.trim().length === 0) ||
            tempSteps.some(step => step.title && step.title.trim().length === 0) ||
            stepsToUpdate.some(step => step.path && step.path.trim().length === 0) ||
            stepsToUpdate.some(step => step.title && step.title.trim().length === 0) ||
            tempSteps.some(step => step?.components?.length === 0)
        ) {
            return true
        }
        return false
    }, [tempSteps, stepsToUpdate])


    const prepareNewStep = () => {
        setAddStep(false)
        setTempSteps([...tempSteps, { id: 0, title: '', path: '', components: [] }])
    }

    const createNewStep = async (data: Omit<Step, 'id'>) => {
        setLoading(true)
        try {
            await createStep(data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const prepareForUpdate = (id: number, data: Partial<Step>) => {
        if (stepsToUpdate.findIndex(step => step.id === id) !== -1) {
            setStepsToUpdate((steps) => steps.map(step => {
                if (step.id === id) {
                    if (data.title) step.title = data.title
                    if (data.path) step.path = data.path
                    if (data.components) step.components = data.components
                }

                return step
            }))
        } else {
            setStepsToUpdate([...stepsToUpdate, { id, ...data } as Step])
        }
    }

    const cancelUpdate = (id: number) => {
        const steps = stepsToUpdate.filter(step => step.id !== id)
        setStepsToUpdate([...steps])
    }
    
    const updateStep = async (step: Step) => {
        setLoading(true)
        try {
            await updateSteps(step.id, step)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const prepareForDelete = (id: number | undefined) => {
        if (id) setStepToRemove(id)
        openConfirmationModal()
    }

    const confirmDeleteStep = async () => {
        setLoading(true)
        if (!stepToRemove) return

        try {   
            await deleteStep(stepToRemove)
        } catch (err) {
            console.log(err)
        } finally {
            cancelUpdate(stepToRemove)
            await getSteps(true)
            closeConfirmationModal()
            setAddStep(true)
            setLoading(false)
        }
    }

    if (loading || steps.length === 0) {
        return <Spinner/ >
    }

    return (
        <div>
            <div className="flex flex-col gap-8">
                <div className="flex gap-6">
                    {steps && tempSteps.map((step) =>
                        <StepCard
                            key={step.id}
                            step={step}
                            error={false}
                            onChange={onChange}
                            onSelect={onSelect}
                            selectedComponents={step.components}
                            componentList={ALLOWED_COMPONENTS}
                            onDelete={(id) => prepareForDelete(id)}
                        />
                    )}

                    <span className="flex gap-8 justify-center items-center px-8" >
                        {addStep && <IoAddCircleSharp size={48} className="text-zinc-300 hover:text-zinc-400 hover:cursor-pointer" onClick={prepareNewStep} />}
                    </span>
                </div>
                <div>
                    <AppButton label="Save" disabled={isSaveDisabled} onClick={() => handleSave()}/>
                </div>
            </div>

            <dialog ref={dialogRef} className="absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-20">
                <div className="flex w-full h-full justify-center items-center">
                    <div className="bg-white rounded-xl p-8">
                        <h1 className="font-black text-xl mb-4">Delete</h1>
                        <p className="mb-8">Are you sure you want do delete this step?</p>

                        <div className="flex justify-end items-center gap-4">
                            <button onClick={closeConfirmationModal}>Cancel</button>
                            <button className="px-3 py-1 bg-red-500 rounded-lg text-white" onClick={confirmDeleteStep}>Delete</button>
                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    )
}