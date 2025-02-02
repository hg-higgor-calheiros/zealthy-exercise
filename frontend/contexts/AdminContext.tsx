'use client'

import { createContext, JSX, useCallback, useContext, useEffect, useState } from "react";
import { Step } from "./OnboardingContext";

export type ComponentTypes = 'about_me' | 'address_form' | 'birthday' | 'sign_up'

export interface AdminContextProps {
    steps: Step[],
    getSteps: (ignoreCache?: boolean) => Promise<Step[]>
    createStep: (step: Omit<Step, 'id'>) =>  Promise<void>
    updateSteps: (id: number, step: Omit<Step, 'id'>) => Promise<void>
    deleteStep: (id: number) => Promise<void>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://zealthy-exercise-production.up.railway.app'

const AdminContext = createContext<AdminContextProps>({} as AdminContextProps);

export function AdminProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [steps, setSteps] = useState([] as Step[])

    const fetchSteps = useCallback(async function () { 
        const response = await fetch(API_URL + '/steps');
        const data = await response.json()
        setSteps(data)
    }, [])

    useEffect(() => {
        fetchSteps()
    }, [setSteps, fetchSteps])

    const getSteps = async (ignoreCache: boolean = false): Promise<Step[]> => {
        if (steps.length === 0 || ignoreCache) fetchSteps()
        return steps
    }

    const createStep = async (step: Omit<Step, 'id'>): Promise<void> => {
        const response = await fetch(API_URL + `/steps`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...step })
        })

        const data = await response.json()
        return data
    }

    const updateSteps = async (id: number, step: Omit<Step, 'id'>): Promise<void> => {
        return new Promise(async (res) => {
            const response = await fetch(API_URL + `/steps/${id}`, {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...step })
            })
    
            const data = await response.json()

            res(data)
        })

    }

    const deleteStep = async (id: number): Promise<void> => {
        const response = await fetch(API_URL + `/steps/${id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        const data = await response.json()
        return data
    }

    return (
        <AdminContext.Provider value={{ steps, getSteps, createStep, updateSteps, deleteStep }} >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    return useContext(AdminContext);
}