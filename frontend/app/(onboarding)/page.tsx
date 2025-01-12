'use client';

import { TextInput } from "@/components/inputs/TextInput";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter()
  const { signUp } = useOnboarding()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    await signUp(email, password)
    router.push('/step-two')
  }

  const disableButton = () => !email || !password

  return (
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl text-zinc-600">Welcome to Zealthy</h1>
        <div className="flex flex-col gap-6 border border-spacing-0.5 m-5 p-5 rounded-xl">
            
            <TextInput label={'Email'} onChange={setEmail}></TextInput>
            <TextInput label={'Password'} onChange={setPassword} type="password"></TextInput>

            <button 
              className={`
                  px-6 py-2 rounded-md text-white 
                  ${ disableButton() ? 'bg-zinc-500' : 'bg-blue-500 hover:bg-blue-700' }
              `} 
              onClick={handleSignUp} 
              disabled={disableButton()}>
                  Next
          </button>
        </div>
    </div>
  );
}
