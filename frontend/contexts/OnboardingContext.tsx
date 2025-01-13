'use client'

import { createContext, JSX, useCallback, useContext, useEffect, useState } from "react";
import { User, UserResponse } from "./DataContext";

export type ComponentTypes = 'about_me' | 'address_form' | 'birthday'

export interface OnboardingContextProps {
    getConfig: (step: 'second' | 'third') => Promise<Step>
    signUp: (email: string, password: string) => Promise<void>,
    birthday: Date | undefined,
    setBirthday: (date: Date | null) => void
    setAboutMe: (text: string) => void
    setAddressFirstLine: (value: string) => void
    setAddressSecondLine: (value: string) => void
    setAddressState: (value: string) => void
    submitData: () => Promise<void>
}

export interface Step {
    title: string,
    components: ComponentTypes[]
}

// Replace with env vars
const API_URL = 'https://zealthy-exercise-production.up.railway.app'

const OnboardingContext = createContext<OnboardingContextProps>({} as OnboardingContextProps);

export function OnboardingProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [steps, setSteps] = useState([] as Step[])
    const [id, setId] = useState('')
    const [email, _setEmail] = useState('')
    const [password, _setPassword] = useState('')
    const [birthday, _setBirthday] = useState<Date>()
    const [aboutMe, _setAboutMe] = useState('')
    const [addressFistLine, _setAddressFistLine] = useState('')
    const [addressSecondLine, _setAddressSecondLine] = useState('')
    const [addressState, _setAddressState] = useState('')

    const fetchSteps = useCallback(async function () {
        const response = await fetch(API_URL + '/steps');
        const data = await response.json()
        setSteps(data)
    }, [])

    useEffect(() => {
        fetchSteps()
    }, [setSteps, fetchSteps])

    const getConfig = async (step: 'second' | 'third'): Promise<Step> => {
        if (steps.length === 0) fetchSteps()
        return step === 'second' ? steps[0] : steps[1]
    }

    const signUp = async (email: string, password: string) => {
        _setEmail(email)
        _setPassword(password)

        // Send data to the API
        const { identifiers } = await saveUser({ email, password })

        setId(identifiers[0].id.toString())
    }

    const formatedAddress = () => `${addressFistLine}, ${addressSecondLine} - ${addressState}`

    const setBirthday = (date: Date | null) => _setBirthday(date ?? undefined)
    const setAboutMe = (text: string) => _setAboutMe(text)
    const setAddressFirstLine = (text: string) => _setAddressFistLine(text)
    const setAddressSecondLine = (text: string) => _setAddressSecondLine(text)
    const setAddressState = (text: string) => _setAddressState(text)

    const submitData = async () => {
        await updateUser({
            email,
            password,
            address: formatedAddress(),
            birthday: birthday?.toISOString(),
            about_me: aboutMe
        })
    }

    const saveUser = async (user: User): Promise<UserResponse> => {
        const response = await fetch(API_URL + "/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json()
        return data
    }

    const updateUser = async (user: Partial<User>): Promise<User> => {
        const response = await fetch(API_URL + "/users/" + id, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json()
        return data
    }

    return (
        <OnboardingContext.Provider
            value={{
                birthday, 
                getConfig, 
                signUp, 
                setBirthday, 
                setAddressFirstLine, 
                setAddressSecondLine, 
                setAddressState, 
                setAboutMe, 
                submitData
            }} >
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    return useContext(OnboardingContext);
}