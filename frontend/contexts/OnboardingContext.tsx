'use client'

import { createContext, JSX, useCallback, useContext, useEffect, useState } from "react";
import { User, UserResponse } from "./DataContext";

export type ComponentTypes = 'about_me' | 'address_form' | 'birthday' | 'sign_up'

export interface OnboardingContextProps {
    steps: Step[],
    getConfig: (step: 'second' | 'third') => Promise<Step>
    signUp: (email: string, password: string) => Promise<void>,
    signIn: (email: string, password: string) => Promise<{token: string, error?: unknown}>,
    setBirthday: (date: Date | null) => void
    birthday: Date | undefined,
    setAboutMe: (text: string) => void
    aboutMe: string | undefined,
    setAddressFirstLine: (value: string) => void
    setAddressSecondLine: (value: string) => void
    setAddressState: (value: string) => void
    address: string | undefined
    submitData: () => Promise<void>
}

export interface Step {
    id: number
    title: string,
    path: string,
    components: ComponentTypes[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://zealthy-exercise-production.up.railway.app'

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

    const signIn = async (email: string, password: string): Promise<{token: string, error?: unknown}> => {
        try {
            const { token } = await authUser(email, password)
            return { token }
        } catch (err) {
            return { token: '', error: err}
        }
    };

    const formatedAddress = () => (addressFistLine || addressSecondLine ||addressState ) ? `${addressFistLine}, ${addressSecondLine} - ${addressState}` : undefined

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

    // Move calls to useApi()
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

    const authUser = async (email: string, password: string): Promise<{ token: string }> => {
        const response = await fetch(API_URL + "/users/auth", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.status === 401 ) {
            throw new Error('Unauthorized')
        }

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
                steps,
                getConfig, 
                signUp,
                signIn, 
                setBirthday,
                birthday, 
                setAddressFirstLine, 
                setAddressSecondLine, 
                setAddressState, 
                address: formatedAddress(),
                setAboutMe, 
                aboutMe,
                submitData
            }} >
            {children}
        </OnboardingContext.Provider>
    );
}

export function useOnboarding() {
    return useContext(OnboardingContext);
}