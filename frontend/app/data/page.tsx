'use client'

import { useData } from "@/contexts/DataContext"

export default function UserDataPage() {
    const { users } = useData()

    return (
        <div className="flex flex-1 flex-col w-screen h-screenm-auto justify-center items-center text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div>
                <h1 className="text-black text-3xl mb-5">UserData Page</h1>
            </div>
            <div className="">
                <table className="table-auto overflow-auto">
                <thead>
                    <tr>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">ID</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Email</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">About Me</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Birthday</p>
                    </th>
                    <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">Address</p>
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                     <tr key={user.id}>

                        <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {user.id}
                            </p>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {user.email}
                            </p>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {user.about_me}
                            </p>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {user.birthday}
                            </p>
                        </td>

                        <td className="p-4 border-b border-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                {user.address}
                            </p>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}