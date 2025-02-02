'use client'

import { ReactNode } from "react"
import { usePathname } from 'next/navigation'
import { VerticalLine } from "./VerticalLine"
import Step from "./Step"
import { useOnboarding } from "@/contexts/OnboardingContext"

type StepsLayoutProps = {
  children: ReactNode,
  title: string
}

// This could be used to generate the steps dynamically
export const StepsLayout = ({ children, title }: StepsLayoutProps) => {
  const pathname = usePathname()
  const { steps } = useOnboarding()

  const isPathActive = (path: string) => path === pathname

  return (
    <section className='flex justify-start gap-6 w-screen'>
      <div className='px-8 py-6 w-1/4'>
        <div className="flex h-[90%] m-auto flex-col bg-zinc-100 p-12 rounded-xl">

          <Step path={'/credentials'} title={'Credentials'} active={isPathActive('/credentials')}/>
          
          {steps.map(step => (
            <div key={step.id}>
              <VerticalLine active={false} />
              <Step path={step.path} title={step.title} active={isPathActive(step.path)}/>
            </div>
          ))}

        </div>
      </div>
      <div className="w-3/4 h-[90vh] flex flex-col items-start justify-start p-12">

        <h1 className="mb-8 text-zinc-700 text-2xl">{title}</h1>
        
        <div className="shadow-xl p-8 rounded-xl w-full">
          <form>{children}</form>
        </div>
      </div>
    </section>
  )
}
