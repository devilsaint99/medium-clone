import { Link } from "react-router-dom"


interface AuthHeader {
    type: string
}
export const AuthHeader = ({type}: AuthHeader) =>{
    return(
            <>
                <div className="flex justify-center font-bold text-3xl" >
                    {type === "signup"? "Create an account" : "Login in to ReadMe"}
                </div>
                <div className="flex justify-center pt-2 text-gray-400 font-medium">
                    {type === "signup"? "Already have an account?": "Don't have an account?"}
                    <Link className="pl-1 underline" to={type === "signup" ? "/signin": "/signup"}>{type === "signup"? "Login" : "Sign up"}</Link>
                </div>
            
            </>
            
                
    )
}