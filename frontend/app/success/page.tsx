'use client';

import { useRouter } from "next/navigation";
import { FaHeartCircleCheck } from "react-icons/fa6";

export default function SuccessPage () {
    const router = useRouter()
    
    return (
        <div className="flex flex-col justify-center items-center gap-2 shadow-2xl rounded-xl p-8 max-w-96">
            <div>
                <FaHeartCircleCheck size={80} className="text-green-500"/>
            </div>
            <div>
                <h1 className="text-3xl font-bold">Thank you!</h1>
            </div>
            <div className="mt-12 text-zinc-500 text-justify">
                <p>The form was submitted successfuly and we are very happy to have you with us.</p>
            </div>
            
            <div className="mt-12 text-zinc-500 text-justify">
                <button className="px-8 py-2 border border-green-500 rounded-3xl text-green-500" onClick={() => router.push('/')}>Back to Home</button>
            </div>
        </div>
    )
}