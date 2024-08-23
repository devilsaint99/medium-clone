interface ButtonInterface {
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({label, onClick}: ButtonInterface)=>{
    return(
        <button onClick={onClick} className="bg-gray-950 h-9 rounded-lg w-full text-white">
            {label}
        </button>
    )
}