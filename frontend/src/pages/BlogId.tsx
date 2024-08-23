import { useNavigate } from "react-router-dom"
import { AppBar } from "../components/AppBar"
import { useBlog, useRequiredParams } from "../hooks"
import { Avatar } from "../components/Avatar"
import moment from "moment"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const BlogId = ()=>{
    const navigate = useNavigate()
    const {id} = useRequiredParams<{id: string}>()
    const {blog, loading} = useBlog({id})
    console.log(blog)
    if(loading){
        return(
            <div>
                <AppBar onClick={()=>navigate("/publish")} buttonType="Write"/>
                <BlogSkeleton />
            </div>
        )
    }
    return (
        <div>
            <AppBar onClick={()=>navigate("/publish")} buttonType="Write"/>
            <div className="grid justify-items-center ">
                <div className="max-w-lg">
                    <div className="text-4xl">
                        {blog.title}
                    </div>
                    <div className="flex place-items-center my-3">
                        <Avatar initials={blog.user.firstName.charAt(0)}/>
                        <div className="font-thin text-xs ml-2 text-slate-500">
                            <div className="font-semibold">
                                {blog.user.firstName}
                            </div>
                            <div className="flex">
                                <div className="font-semibold">
                                    Published at
                                </div>
                                 
                                <div className="ml-1">
                                    {`${moment().month(blog.LastUpdated.slice(6,8)).format('MMM')} ${blog.LastUpdated.slice(8,10)}, ${blog.LastUpdated.slice(0,4)}`}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {blog.Post}
                    </div>
                </div>

            </div>
            
        </div>
    )
}