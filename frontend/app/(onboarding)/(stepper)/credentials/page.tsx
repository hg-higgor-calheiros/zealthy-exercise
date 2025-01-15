'use client';

import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isEmail } from "../../../utils/validation";
import RenderComponents from "@/app/utils/render";
import { Navigation } from "@/components/steps/Navigation";
import { StepsLayout } from "@/components/steps/StepsLayout";

export default function Home() {
  const router = useRouter()
  const { signUp } = useOnboarding()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const disableButton = () => !email || !isEmail(email) || !password || password.length < 8

  const onChangeEmail = (email: string) => {
    setEmail(email)
    
    if (!isEmail(email)) {
      setError("Invalid email")
    } else {
      setError('')
    }
  }

  const onChangePassword = (password: string) => {
    setPassword(password)

    if (password.length < 8) {
      setError("Password must have at least 8 characters")
    } else {
      setError('')
    }
  }

  const handleSave = async () => {
    await signUp(email, password)
    router.push('/step-two')
 }

  return (
      <StepsLayout title={'Credentials'}>
          {RenderComponents({components: ['sign_up'], error, onChangeEmail, onChangePassword })}
          <Navigation back="/" next="step-two" onSubmit={handleSave} stepIsValidated={!disableButton()}/>
      </StepsLayout>
  );
}
