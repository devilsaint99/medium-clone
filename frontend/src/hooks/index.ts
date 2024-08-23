import axios from "axios"
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate, useParams } from "react-router-dom"

export const useBlog = ({id}:{id:string})=>{
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<any>([])


    async function getBlogs(){
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`).then(function(response){
            if(response.status === 200){
                setBlog(response.data)
                setLoading(false)
                console.log(response.data)
            }
            return response
        }).catch(function(error){
            if(error.response){
                // navigate("/signin")
                console.error(error.response)
            }
        })
    }

    useEffect(()=>{
        getBlogs()
    },[id])
    return {
        loading, blog
    }
}



export const useBlogs = ()=>{
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<any[]>([])
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()

    async function getBlogs(){
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`} 
        }).then(function(response){
            if(response.status === 200){
                setBlogs(response.data)
                setLoading(false)
                console.log(response.data)
                setAuth(true)
            }
            return response
        }).catch(function(error){
            if(error.response){
                navigate("/signin")
            }
        })
    }

    useEffect(()=>{
        getBlogs()
    },[])
    return {
        loading, blogs, auth
    }
}

export function useRequiredParams<T extends Record<string, any>>() {
    const params = useParams<T>();
    return params as T;
  }