import { useRef, useState } from "react";
import { AppBar } from "../components/AppBar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { PostCreateInput } from "@devilsaint/medium-clone-common/dist/blog";
import { useNavigate } from "react-router-dom";

export const Publish = ()=>{
    const textbox = useRef<HTMLTextAreaElement>(null);
    const [blog, setBlog] = useState<PostCreateInput>({
        title: "",
        post:""
    })
    const navigate = useNavigate()

    function adjustHeight(textarea:any) {
        if(textarea){
            textarea.style.height = "inherit";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }

    // useLayoutEffect(adjustHeight, []);
    
    // useLayoutEffect(()=>{
    //     adjustHeight
    // }, []);

    
    function handleKeyDown(e:any) {
        adjustHeight(e.target);
    }

    async function createPost(e:any){
        e.currentTarget.disabled = true
        axios.post(`${BACKEND_URL}/api/v1/blog`, blog, {
            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}
        }).then(function(response){
            if(response.status === 200){
                navigate("/")
            }
        })

    }


    return(
        <div>
            <AppBar buttonType="Publish" onClick={(e)=>{createPost(e)}}/>
            <div className="mt-10">
                <div className="text-5xl">
                    <textarea ref={textbox} onChange={e=>{
                        handleKeyDown(e)
                        setBlog((c)=>({
                            ...c,
                            title: e.target.value
                        }))
                    }} placeholder="Title" className="w-3/4 ml-24 focus:outline-none shadow-lg max-h-full"></textarea>
                </div>
                <div className="mt-3">
                    <textarea ref={textbox} onChange={e =>{
                        handleKeyDown(e)
                        setBlog((c)=>({
                            ...c,
                            post: e.target.value
                        }))

                    }} className="w-3/4 ml-24 shadow-lg focus:outline-none max-h-full" placeholder="Tell your story...">
                    </textarea>
                </div>
                
            </div>
        </div>
    )
}