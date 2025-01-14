'use client'

import { createContext, JSX, useCallback, useContext, useEffect, useState } from "react";

export interface User {
    id?: number,
    email: string,
    password: string,
    about_me?: string,
    birthday?: string,    
    address?: string
}

export interface UserResponse {
    identifiers: { id: number }[]
}

export interface UsersProps {
    users: User[],
    getUsers: () => Promise<User[]>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL

const DataContext = createContext<UsersProps>({} as UsersProps);

export function DataProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
    const [users, setUsers] = useState([] as User[])

    const fetchUsers = useCallback(async function () { 
        const response = await fetch(API_URL + '/users');
        const data = await response.json()
        setUsers(data)
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [setUsers, fetchUsers])

    const getUsers = async (): Promise<User[]> => {
        if (users.length === 0) fetchUsers()
        return users
    }

    return (
        <DataContext.Provider value={{ users, getUsers }} >
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}