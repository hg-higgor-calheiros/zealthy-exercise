'use client';

import { TextInput } from "@/components/inputs/TextInput";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isEmail } from "../utils/validation";

export default function Home() {
  const router = useRouter()
  const { signIn } = useOnboarding()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    const { token, error } = await signIn(email, password)
    
    if (error) setError("Invalid credentials")
    else {
      // TODO set token as cookie to validate the session

      console.log(token)
      router.push('/step-two')
    }
  }

  const disableButton = () => !email || !isEmail(email) || !password

  const checkEmail = (email: string) => {
    setEmail(email)
    
    if (!isEmail(email)) {
      setError("Invalid email")
    } else {
      setError('')
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl text-zinc-600">Welcome to Zealthy</h1>
        <div className="flex flex-col gap-6 border border-spacing-0.5 m-5 p-5 rounded-xl">
            
            <TextInput label={'Email'} onChange={checkEmail}></TextInput>
            <TextInput label={'Password'} onChange={setPassword} type="password"></TextInput>

            <div className="h-3">
              {error && <p className="text-red-600">{error}</p> }
            </div>

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
