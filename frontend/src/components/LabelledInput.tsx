import { ChangeEvent } from "react"

interface labelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

export const LabelledInput = ({label, placeholder, onChange, type}: labelledInputType)=>{
    return(
        <div>
            <div className="pt-3 font-bold h-9">
                    {label}
            </div>
            <div className="flex pt-2">
                <input onChange={onChange} type={type || "text" } placeholder={placeholder} className="border-gray-300 pl-3 border-2 border-solid h-9 rounded-lg w-full focus:outline-slate-500"></input>
            </div>
            
        </div>
    )
}