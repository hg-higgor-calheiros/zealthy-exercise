type StepTitleProps = {
    active: boolean;
    title: string;
  };
  

export const StepTitle = ({ active, title }: StepTitleProps) => {
return (
    <h2
    className={`text-md lg:text-xl ${
        active
        ? "text-transparent bg-clip-text text-zinc-800"
        : "text-zinc-400"
    }`}
    >
    {title}
    </h2>
);
};