import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const HomePage = ()=>{
    const navigate = useNavigate()
    return (
            <div className="bg-slate-100 w-full h-screen place-content-center grid text-center justify-center">
                <div className="text-8xl font-mono">
                    ReadMe
                </div>
                <div className="font-serif text-2xl">
                    <div>
                        Welcome to Readme,
                    </div>
                    <div>
                        where your stories matter.
                    </div>
                </div>
                <div className="flex place-content-center w-96 mt-5">
                    <div className="w-32 mx-3">
                        <Button label="Sign Up" onClick={()=>navigate("/signup")}/>
                    </div>

                    <div className="w-32 mx-3">
                        <Button label="Get Started" onClick={()=>navigate("/blogs")}/>
                    </div>
                    
                    <div className="w-32 mx-3">
                        <Button label="Sign In" onClick={()=>navigate("/signin")}/>
                    </div>
                    
                </div>
            </div>
        
    )
}