'use client'

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'

type StepsLayoutProps = {
  children: ReactNode,
  title: string
}

export const StepsLayout = ({ children, title }: StepsLayoutProps) => {
  const pathname = usePathname()

  return (
    <article className='flex justify-start gap-28 min-w-[82%]'>
      <div className='flex flex-col px-8 py-6 mx-20 h-[200px] border-r-2 border-[#8586887c] border-dashed'>
        <Link href='/'>
          <p>Home</p>
        </Link>
        <Link href='/step-two'  className={pathname === '/step-two' ? 'underline' : ''}>
          <p>Step 2</p>
        </Link>
        <Link href='/step-three'  className={pathname === '/step-three' ? 'underline' : ''}>
          <p>Step 3</p>
        </Link>
      </div>
      <div>
        <h1 className="mb-4 text-zinc-700">{title}</h1>
        <form>{children}</form>
      </div>
    </article>
  )
}
