'use client'

import { createContext, JSX, useCallback, useContext, useEffect, useState } from "react";

export type ComponentTypes = 'about_me' | 'address_form' | 'birthday'

export interface AdminContextProps {
    getSteps: () => Promise<Step[]>
    updateSteps: (id: string, components: ComponentTypes[]) => Promise<void>
}

export interface Step {
    title: string,
    components: ComponentTypes[]
}

const API_URL = 'http://localhost:5000'

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

    const getSteps = async (): Promise<Step[]> => {
        if (steps.length === 0) fetchSteps()
        return steps
    }

    const updateSteps = async (id: string, components: ComponentTypes[]): Promise<void> => {
        const response = await fetch(API_URL + `/steps/${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ components })
        })

        const data = await response.json()
        return data
    }

    return (
        <AdminContext.Provider value={{ getSteps, updateSteps }} >
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    return useContext(AdminContext);
}