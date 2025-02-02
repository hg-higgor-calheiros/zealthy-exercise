type DotProps = {
    active: boolean
  }
  
  export const Dot = ({ active }: DotProps) => {
    return (
      <div
        className={`w-[16px] h-[16px] rounded-full ${
          active ? "bg-gradient-to-r from-zinc-600 via-30% to-zinc-900 to-90%" : "bg-zinc-400 opacity-25 hover:opacity-40"
        }`}
      ></div>
    )
  }