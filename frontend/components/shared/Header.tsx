'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header () {
    const pathname = usePathname()
    
    return (
        <header>
            <div className="flex flex-1 w-screen h-20 items-center py-2 px-6 m-auto bg-slate-200 divide-x-2 gap-6" >
                <Link href={'/'} className={pathname === '/' ? 'underline' : ''}> Home </Link>
                <Link href={'/admin'} className={pathname === '/admin' ? 'underline' : ''}> Admin </Link>
                <Link href={'/data'} className={pathname === '/data' ? 'underline' : ''}> Data </Link>
            </div>
        </header>
    )
}