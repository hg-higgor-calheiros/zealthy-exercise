import { TextInput } from "./inputs/TextInput";

interface SignUpProps {
    error?: string
    onChangeEmail: (value: string) => void
    onChangePassword: (value: string) => void
}

export default function SignUp ({ error, onChangeEmail, onChangePassword }: SignUpProps) {
    return (
        <div className="w-full flex flex-col gap-4 items-start justify-center m-6">
            <h1 className="font-bold text-2xl text-zinc-800 mb-[-12px]">{"First, we need to set your credentials"}</h1>
            <p className="mb-12 text-zinc-600 font-light">Be sure to use a valid email and a password with more than 8 characters</p>
            
            <TextInput label={'Email'} onChange={onChangeEmail}></TextInput>
            <TextInput label={'Password'} onChange={onChangePassword} type="password"></TextInput>

            <div className="h-3">
              {error && <p className="text-red-600">{error}</p> }
            </div>
        </div>
    )
}