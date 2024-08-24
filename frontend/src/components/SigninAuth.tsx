import { LabelledInput } from "./LabelledInput"
import { Button } from "./Button"
import { useEffect, useState } from "react"
import { SignInInput, } from "@devilsaint/medium-clone-common/dist/user"
import { AuthHeader } from "./AuthHeader"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const SigninAuth = ()=>{
    const [postInputs, setPostInputs] = useState<SignInInput>({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    function check(){
        axios.get(`${BACKEND_URL}/api/v1/user`,{
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }).then(function(response){
            if(response.status === 200){
                navigate("/blogs")
            }
        })
    }


    useEffect(()=>{
        check()
    },[])

    async function sendRequest(){
        try{
            axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs).then(function(response){
                if(response.status === 200){
                    const jwt = response.data.message
                    localStorage.setItem('token', jwt)
                    navigate("/blogs")
                }
            }).catch(function(error){
                toast.error(error.response.data.message)
            })
            
        }
        catch(e){
            console.error(e)
        }
        
        
    }
    return(
        <div className="h-screen flex place-content-center">
            <div className="w-2/3 max-w-sm place-content-center">
                <AuthHeader type="signin"/>
                
                <LabelledInput label={"Email"} placeholder={"user@email.com"} onChange={e=>{
                    setPostInputs((c)=>({
                        ...c,
                        email: e.target.value
                    }))
                }}/>
                
                <LabelledInput label={"Password"} type={"password"} placeholder={"Enter your password"} onChange={e=>{
                    setPostInputs((c)=>({
                        ...c,
                        password: e.target.value
                    }))
                }}/>
                <div className="mt-4">
                    <Button label={"Sign In"} onClick={sendRequest}/>
                </div>
            </div>
        </div>
    )
}


