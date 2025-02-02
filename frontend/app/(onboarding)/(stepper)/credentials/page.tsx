'use client';

import { useOnboarding } from "@/contexts/OnboardingContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isEmail } from "../../../utils/validation";
import RenderComponents from "@/app/utils/render";
import { Navigation } from "@/components/ui/stepper/Navigation";
import { StepsLayout } from "@/components/ui/stepper/StepsLayout";

export default function Home() {
  const router = useRouter()
  const { steps, signUp } = useOnboarding()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const next = steps[0].path

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
          <Navigation back="/" next={next} onSubmit={handleSave} stepIsValidated={!disableButton()}/>
      </StepsLayout>
  );
}
