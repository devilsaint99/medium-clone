import { LabelledInput } from "./LabelledInput"
import { Button } from "./Button"
import { useEffect, useState } from "react"
import { SignUpInput } from "@devilsaint/medium-clone-common/dist/user"
import { AuthHeader } from "./AuthHeader"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
export const SignupAuth = ()=>{
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignUpInput>({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    })

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
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`,
                postInputs
            )
            if(response.status === 200 ){
                toast('Account created Successfully. Redirecting to Login Page');
                setTimeout(()=>{
                    navigate("/signin")
                },6000)
            }
        }
        catch(e){
        }
    }
    return(
        <div className="h-screen flex place-content-center">
            <div className="w-2/3 max-w-sm place-content-center">
                <AuthHeader type="signup"/>
                
                <LabelledInput label={"Email"} placeholder={"user@email.com"} onChange={e=>{
                    setPostInputs((c)=>({
                        ...c,
                        email: e.target.value
                    }))
                }}/>
                <LabelledInput label={"First Name"} placeholder={"Enter your first name"} onChange={e=>{
                    setPostInputs((c)=>({
                        ...c,
                        firstName: e.target.value
                    }))
                }}/> 
                <LabelledInput label={"Last Name"} placeholder={"Enter your last name"} onChange={e=>{
                    setPostInputs((c)=>({
                        ...c,
                        lastName: e.target.value
                    }))
                }}/>
                
                <LabelledInput label={"Password"} type={"password"} placeholder={"Enter your password"} onChange={e=>{
                    setPostInputs((c)=>({
                        ...c,
                        password: e.target.value
                    }))
                }}/>
                <div className="mt-4">
                    <Button label={"Sign Up"} onClick={sendRequest}/>
                </div>
            </div>
            
        </div>
    )
}


