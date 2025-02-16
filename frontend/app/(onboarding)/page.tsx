'use client';

import { TextInput } from "@/components/ui/inputs/TextInput";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isEmail } from "../utils/validation";
import Link from "next/link";

export default function Home() {
  const router = useRouter()
  const { signIn } = useOnboarding()
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignUp = async () => {
    setLoading(true)
    const { token, error } = await signIn(email, password)
    
    if (error){ 
      setLoading(false)
      setError("Invalid credentials")
    } else {
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

            <div className="p-2">
              <p>Dont have an account? <Link href={'/credentials'} className="font-semibold">Click here</Link> to create one</p>
            </div>

            <button 
              className={`
                  px-6 py-2 rounded-md text-white 
                  ${ disableButton() ? 'bg-zinc-500' : 'bg-blue-500 hover:bg-blue-700' }
              `} 
              onClick={handleSignUp} 
              disabled={disableButton()}>
                  {loading ? 'Authenticating..' : 'Access'}
          </button>
        </div>
    </div>
  );
}
