import { Avatar } from "./Avatar"
import { decode } from "hono/jwt"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface IButtonType {
    buttonType: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}


export const AppBar = ({buttonType, onClick}: IButtonType)=>{
    const [user,setUser] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()


    function getCurrentLoggedInUser(){
        const payloadData = decode(localStorage.getItem('token') || "")
        const firstName: any = payloadData.payload.firstName
        setUser(firstName)
    }
    useEffect(()=>{
        getCurrentLoggedInUser()
    },[])
    return(
        <div className="flex justify-between px-10 border-b-0 pt-2">
            <div  className="font-bold text-xl">
                ReadMe
            </div>
            <div className="flex relative place-items-center">
                <div className="text-slate-500 mr-5 place-items-center font-serif">
                    <button className="" onClick={onClick}>
                        {buttonType}
                    </button>
                </div>
                <button onClick={()=>{
                    setIsOpen(!isOpen)
                }}>
                    <Avatar initials={user.charAt(0)}/>
                </button>
                {isOpen && <div className="absolute top-10 -right-2.5 bg-gray-950 rounded-lg px-4 py-1 text-white">
                    <button onClick={()=>{
                        localStorage.removeItem('token')
                        navigate("/signin")
                    }}>Logout</button>
                </div>}               
            </div>
            
        </div>
    ) 
}