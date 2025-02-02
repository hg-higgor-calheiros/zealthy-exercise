'use client'

import Link from "next/link";

type NavigationButtonsProps = {
  back: string;
  next?: string;
  onSubmit?: () => Promise<void>; 
  stepIsValidated?: boolean;
};

export const Navigation = ({
  back,
  next,
  onSubmit,
  stepIsValidated = true,
}: NavigationButtonsProps) => {
  return (
    <div className="relative flex gap-24 m-6">
        <Link href={back}>
            <button className="px-2 py-1 border-2 rounded-lg text-[18px] lg:text-[24px]">Back</button>
        </Link>
        <Link href={next ?? ''}>
            <button className={`px-2 py-1 border-2 rounded-lg text-[18px] lg:text-[24px] ${stepIsValidated ? '' : 'text-zinc-200'}`}
                disabled={!stepIsValidated}
                onClick={onSubmit}
            >
                {next ? 'Next': 'Submit'}
            </button>
        </Link>
    </div>
  );
};